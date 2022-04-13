import React, { useEffect, useRef } from "react"
import "./Navbar.css"
import logo from "../../Assets/Images/logo.png"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  const navRef = useRef()

  // navbar box-shodow Effect when scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollable = 30
      var scrolled = window.scrollY
      if (Math.ceil(scrolled) >= scrollable) {
        navRef.current.classList.add("scroll-shadow")
      } else {
        navRef.current.classList.remove("scroll-shadow")
      }
    })
  }, [])

  return (
    <>
      <div className="navbar" ref={navRef}>
        <NavLink to={"/"}>
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <NavLink to={"/"} className="navLink">
          <span className="material-icons-round">home</span> <span>Home</span>
        </NavLink>
        <NavLink to={"/booking"} className="navLink">
          <span className="material-icons-round">book_online</span>{" "}
          <span>Book Appointment</span>
        </NavLink>
        <NavLink to={"/admin"} className="navLink">
          <span className="material-icons-round">admin_panel_settings</span>
          <span>Admin Panel</span>
        </NavLink>
      </div>
    </>
  )
}
