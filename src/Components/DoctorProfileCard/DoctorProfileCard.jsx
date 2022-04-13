import React from "react"
import "./DoctorProfileCard.css"
import { Link } from "react-router-dom"

export const DoctorProfileCard = ({ doctor }) => {
  return (
    <>
      <div className="doctorProfileCard">
        <div>
          <img src={doctor.img} alt="" className="profilePhoto" />
        </div>
        <div className="doctorDetail">
          <div className="doctorName">Dr. {doctor.doctorName}</div>
          <div className="specialist">{doctor.specialist}</div>
          <div className="exYear">{doctor.experience} YRS</div>
          <div className="education">{doctor.education}</div>
          <Link to={"/booking"} className="bookAppointmentBtn">
            <span>Book Appointment</span>
            <span className="material-icons-round">chevron_right</span>
          </Link>
        </div>
      </div>
    </>
  )
}
