import TextField from "@mui/material/TextField"
import React, { useEffect, useState } from "react"
import "./Admin.css"

export const Admin = () => {
  const [appointments, setAppointments] = useState([])
  const [doctorName, setDoctorName] = useState("Arnit Singh")

  useEffect(() => {
    getAppointment()
  }, [])

  function getAppointment() {
    fetch(`https://apollo-appointment.herokuapp.com/appointment/${doctorName}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setAppointments(res)
      })
  }
  
  return (
    <main className="adminMain">
      <h2>Admin</h2>
      <div className="mainDiv">
        <div className="controlDiv">
          <TextField
            id="outlined-basic"
            label="Doctor Name"
            value={doctorName}
            variant="outlined"
            size="medium"
            onChange={(e) => {
              setDoctorName(e.target.value)
            }}
            name="fullname"
          />
          <span onClick={getAppointment} className="adminBtn">
            Check
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0
              ? "No Data"
              : appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{appointment._id}</td>
                      <td>{appointment.fullname}</td>
                      <td>{appointment.email}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.description}</td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
