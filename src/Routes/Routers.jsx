import { Routes, Route } from "react-router-dom";
import { Admin } from "../Components/Admin/Admin";
import { AppointmentPage } from "../Components/AppoinmentPage/AppointmentPage";
import { Appointment } from "../Components/Appointment/Appointment";
import { Home } from "../Components/Home/Home";
import { Navbar } from "../Components/Navbar/Navbar";

export const Routers = () => {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Appointment />} />
          <Route path="/appointment/:id" element={<AppointmentPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </>
    )
}