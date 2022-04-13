import React, { useEffect, useState } from "react"
import "./Home.css"
import homeBanner from "../../Assets/Images/hospitalBanner.png"
import { DoctorProfileCard } from "../DoctorProfileCard/DoctorProfileCard"

export const Home = () => {
  // store doctor data in doctor state by fetch
  const [doctor, setDoctor] = useState([])

  useEffect(() => {
    // fetch api using express server and store data in doctor state
    fetch("https://apollo-appointment.herokuapp.com/doctor")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setDoctor(res)
      })
  }, [])

  return (
    <main>
      <div>
        <img src={homeBanner} alt="homebanner" className="homeBanner" />
      </div>
      <h2 className="heading1">Book Appointment with Top Apollo Doctors</h2>
      <div className="doctorList">
        {doctor.map((doctor) => {
          // return DoctorProfileCard components List
          return <DoctorProfileCard doctor={doctor} key={doctor._id} />
        })}
      </div>
    </main>
  )
}
