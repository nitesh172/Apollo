import React, { useEffect, useState } from "react"
import "./Appointment.css"
import Divider from "@mui/material/Divider"
import appointmentBanner from "../../Assets/Images/appointmentBanner.jpg"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import SlotPicker from "slotpicker"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const appointmentState = {
  fullname: "",
  email: "",
  doctorName: "",
  description: "",
  time: "",
  status: "",
}

export const Appointment = () => {
  const [appointment, setAppointment] = useState(appointmentState)
  const [doctors, setDoctors] = useState([])
  const [slots, setSlots] = useState([])
  const [slot, setSlot] = useState("")
  const [id, setId] = useState("")
  const [price, setPrice] = useState("")
  const { vertical, horizontal, open } = state
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  })

  var today = new Date()
  var time = today.getHours() + ":00"

  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://apollo-appointment.herokuapp.com/doctor")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setDoctors(res)
      })
  }, [])

  const handleAppointment = (e) => {
    const { name, value } = e.target
    setAppointment((prev) => {
      return { ...prev, [name]: value }
    })
  }

  function setDoctorSlot() {
    slots.push(slot)
    console.log(slot)
    fetch(`https://apollo-appointment.herokuapp.com/doctor/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ slot: slots }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res)
      })
  }

  function bookAppointment() {
    console.log(appointment)
    fetch(`https://apollo-appointment.herokuapp.com/appointment`, {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        return res
      })
  }

  const handleChange = (event) => {
    setPrice(event.target.value.price)
    setSlots(event.target.value.slot)
    setId(event.target.value._id)
    setAppointment({
      ...appointment,
      doctorName: event.target.value.doctorName,
    })
  }

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState })
    bookAppointment()
    setDoctorSlot()
  }

  const handleClose = () => {
    setState({ ...state, open: false })
    navigate(`/appointment/appointmentid${uuid()}`)
  }

  return (
    <main className="appointmentMain">
      <div className="appointmentBox">
        <div className="bookAppointmentHeading">Book Appointment</div>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          value={appointment.fullname}
          onChange={handleAppointment}
          size="medium"
          name="fullname"
        />
        <TextField
          id="outlined-basic"
          label="Email"
          size="medium"
          variant="outlined"
          onChange={handleAppointment}
          value={appointment.email}
          name="email"
        />
        <FormControl>
          <InputLabel size="medium" id="demo-simple-select-label">
            Doctor Name
          </InputLabel>
          <Select
            size="medium"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Doctor Name"
            placeholder="Student"
            onChange={handleChange}
            className={"roleSelector"}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {doctors.map((doctor) => {
              return (
                <MenuItem value={doctor} key={doctor._id}>
                  {doctor.doctorName + " | " + doctor.specialist}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={handleAppointment}
          value={appointment.description}
          size="medium"
          name="description"
        />
        <SlotPicker
          // Required, interval between two slots in minutes, 30 = 30 min
          interval={20}
          // Required, when user selects a time slot, you will get the 'from' selected value
          onSelectTime={(from) => {
            if (from.$m < 10) {
              setSlot(from.$H + ":" + from.$m + "0")
              setAppointment({
                ...appointment,
                time: from.$H + ":" + from.$m + "0",
                status: "booked",
              })
            } else {
              setSlot(from.$H + ":" + from.$m)
              setAppointment({
                ...appointment,
                time: from.$H + ":" + from.$m,
                status: "booked",
              })
            }
          }}
          // Optional, array of unavailable time slots
          unAvailableSlots={slots}
          // Optional, 8AM the start of the slots
          from={time}
          // Optional, 09:00PM the end of the slots
          to={"23:40"}
          // Optional, 01:00 PM, will be selected by default
          //   defaultSelectedTime={"13:00"}
          // Optional, selected slot color
          selectedSlotColor="#F09999"
          // Optional, language of the displayed text, default is english (en)
          lang="en"
        />
        <h5>Price ₹ {price || 0}/-</h5>
        <div
          className="appointmentBtn"
          onClick={handleClick({
            vertical: "top",
            horizontal: "right",
          })}
        >
          Book
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className="appointmentBox">
        <img
          src={appointmentBanner}
          alt="appointmentBanner"
          className="appointmentBanner"
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          key={vertical + horizontal}
        >
          Appointment Booked Sucessfully!
        </Alert>
      </Snackbar>
    </main>
  )
}
