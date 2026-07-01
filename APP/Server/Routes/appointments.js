const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const { getSlotsForPatients } = require("../utils");
const { slotsList } = require("../utils");

router.post("/patient", (req, res) => {
  const appointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    slotStart: req.body.slotStart,
    slot: req.body.slot,
    date: req.body.date,
    patientId: req.body.patientId,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    contact: req.body.contact,
  });

  appointment
    .save()
    .then((result) => {
      Appointment.find({ date: result.date })
        .exec()
        .then((response) => {
          const timeSlots = getSlotsForPatients(response);
          res.status(200).json(timeSlots);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/patient/slots/:date", (req, res) => {
  const date = req.params.date;
  Appointment.find({ date: date })
    .exec()
    .then((result) => {
      const timeSlots = getSlotsForPatients(result);
      res.status(200).json(timeSlots);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/hospital/:date", (req, res) => {
  const date = req.params.date;
  Appointment.find({ date: date })
    .sort({ slotStart: "asc" })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/patient/:patientId/:date", (req, res) => {
  const patientId = req.params.patientId;
  const date = req.params.date;

  Appointment.find({ patientId: patientId, date: date })
    .sort({ slotStart: "asc" })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/patient/:appointmentId/:patientId/:date", (req, res) => {
  const appointmentId = req.params.appointmentId;
  const patientID = req.params.patientId;
  const date = req.params.date;
  Appointment.deleteOne({ _id: appointmentId })
    .exec()
    .then((result) => {
      Appointment.find({ patientId: patientID, date: date })
        .exec()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
