import express from "express";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

/* ===============================
   🎯 GET SEATS FOR SHOWTIME
================================ */
app.get("/showtimes/:id/seats", async (req, res) => {
  try {
    const showtimeId = Number(req.params.id);

    if (!Number.isInteger(showtimeId) || showtimeId <= 0) {
      return res.status(400).json({ error: "Invalid showtime ID" });
    }

    // Get screen
    const showtime = await sql`
      SELECT screen_id FROM cinema.showtimes
      WHERE id = ${showtimeId}
      LIMIT 1
    `;

    if (showtime.length === 0) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    const screenId = showtime[0].screen_id;

    // Get seats
    const seats = await sql`
      SELECT id, seat_number
      FROM cinema.seats
      WHERE screen_id = ${screenId}
    `;

    // Get booked
    const bookedSeats = await sql`
      SELECT seat_id
      FROM cinema.bookings
      WHERE showtime_id = ${showtimeId}
    `;

    // Get locked (only valid locks)
    const lockedSeats = await sql`
      SELECT seat_id
      FROM cinema.seat_locks
      WHERE showtime_id = ${showtimeId}
      AND locked_until > NOW()
    `;

    const bookedSet = new Set(bookedSeats.map(b => b.seat_id));
    const lockedSet = new Set(lockedSeats.map(l => l.seat_id));

    const available = [];
    const booked = [];
    const locked = [];

    for (const seat of seats) {
      if (bookedSet.has(seat.id)) {
        booked.push(seat.seat_number);
      } else if (lockedSet.has(seat.id)) {
        locked.push(seat.seat_number);
      } else {
        available.push(seat.seat_number);
      }
    }

    res.json({
      screen_id: screenId,
      total_seats: seats.length,
      available,
      locked,
      booked
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


/* ===============================
   🔒 LOCK SEAT (2 MIN)
================================ */
app.post("/locks", async (req, res) => {
  try {
    const showtime_id = Number(req.body.showtime_id);
    const seat_id = Number(req.body.seat_id);

    if (!showtime_id || !seat_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const lockUntil = new Date(Date.now() + 2 * 60 * 1000);

    // Check if already booked
    const booked = await sql`
      SELECT 1 FROM cinema.bookings
      WHERE showtime_id = ${showtime_id}
      AND seat_id = ${seat_id}
    `;

    if (booked.length > 0) {
      return res.status(409).json({ error: "Seat already booked" });
    }

    // Check active lock
    const existingLock = await sql`
      SELECT 1 FROM cinema.seat_locks
      WHERE showtime_id = ${showtime_id}
      AND seat_id = ${seat_id}
      AND locked_until > NOW()
    `;

    if (existingLock.length > 0) {
      return res.status(409).json({ error: "Seat is locked" });
    }

    // Insert / update lock
    await sql`
      INSERT INTO cinema.seat_locks (showtime_id, seat_id, locked_until)
      VALUES (${showtime_id}, ${seat_id}, ${lockUntil})
      ON CONFLICT (showtime_id, seat_id)
      DO UPDATE SET locked_until = ${lockUntil}
    `;

    res.json({
      message: "Seat locked",
      locked_until: lockUntil
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


/* ===============================
   🎟️ CREATE BOOKING
================================ */
app.post("/bookings", async (req, res) => {
  try {
    const showtime_id = Number(req.body.showtime_id);
    const seat_id = Number(req.body.seat_id);
    const user_name = req.body.user_name || "Guest";

    if (!showtime_id || !seat_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Check valid lock
    const lock = await sql`
      SELECT 1 FROM cinema.seat_locks
      WHERE showtime_id = ${showtime_id}
      AND seat_id = ${seat_id}
      AND locked_until > NOW()
    `;

    if (lock.length === 0) {
      return res.status(409).json({ error: "Seat not locked or expired" });
    }

    // Create booking
    const result = await sql`
      INSERT INTO cinema.bookings (showtime_id, seat_id, user_name)
      VALUES (${showtime_id}, ${seat_id}, ${user_name})
      RETURNING *
    `;

    // Remove lock
    await sql`
      DELETE FROM cinema.seat_locks
      WHERE showtime_id = ${showtime_id}
      AND seat_id = ${seat_id}
    `;

    res.status(201).json(result[0]);

  } catch (err) {
    console.error(err);

    // Handle unique constraint (extra safety)
    if (err.code === "23505") {
      return res.status(409).json({ error: "Seat already booked" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});


/* ===============================
   🧹 CLEAN EXPIRED LOCKS
================================ */
app.delete("/locks/cleanup", async (req, res) => {
  try {
    await sql`
      DELETE FROM cinema.seat_locks
      WHERE locked_until < NOW()
    `;

    res.json({ message: "Expired locks removed" });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


/* ===============================
   🚀 START SERVER
================================ */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});