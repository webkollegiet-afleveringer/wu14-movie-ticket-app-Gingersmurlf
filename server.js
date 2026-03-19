import express from "express";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const sql = neon(process.env.DATABASE_URL);

app.use(express.json());

/* ---------------- MOVIES ---------------- */

// GET all movies
app.get("/api/movies", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.movies`;
  res.json(data);
});

// POST movie
app.post("/api/movies", async (req, res) => {
  const { title, release_year } = req.body;

  const result = await sql`
    INSERT INTO cinema.movies (title, release_year)
    VALUES (${title}, ${release_year})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- CINEMAS ---------------- */

app.get("/api/cinemas", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.cinemas`;
  res.json(data);
});

app.post("/api/cinemas", async (req, res) => {
  const { name, location } = req.body;

  const result = await sql`
    INSERT INTO cinema.cinemas (name, location)
    VALUES (${name}, ${location})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- SCREENS ---------------- */

app.get("/api/screens", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.screens`;
  res.json(data);
});

app.post("/api/screens", async (req, res) => {
  const { cinema_id, name } = req.body;

  const result = await sql`
    INSERT INTO cinema.screens (cinema_id, name)
    VALUES (${cinema_id}, ${name})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- SEATS ---------------- */

app.get("/api/seats", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.seats`;
  res.json(data);
});

app.post("/api/seats", async (req, res) => {
  const { screen_id, seat_number } = req.body;

  const result = await sql`
    INSERT INTO cinema.seats (screen_id, seat_number)
    VALUES (${screen_id}, ${seat_number})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- SHOWTIMES ---------------- */

app.get("/api/showtimes", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.showtimes`;
  res.json(data);
});

app.post("/api/showtimes", async (req, res) => {
  const { movie_id, screen_id, start_time } = req.body;

  const result = await sql`
    INSERT INTO cinema.showtimes (movie_id, screen_id, start_time)
    VALUES (${movie_id}, ${screen_id}, ${start_time})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- BOOKINGS ---------------- */

app.get("/api/bookings", async (req, res) => {
  const data = await sql`SELECT * FROM cinema.bookings`;
  res.json(data);
});

app.post("/api/bookings", async (req, res) => {
  const { showtime_id, seat_id, user_name } = req.body;

  const result = await sql`
    INSERT INTO cinema.bookings (showtime_id, seat_id, user_name)
    VALUES (${showtime_id}, ${seat_id}, ${user_name})
    RETURNING *
  `;
  res.json(result[0]);
});

/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});