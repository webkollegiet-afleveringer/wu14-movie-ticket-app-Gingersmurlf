import { Outlet } from "react-router";
import Footer from "./html/footer";

export default function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
