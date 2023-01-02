const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const db = require('../db/db');

router.get('/get', bookingController.getBookingById);
router.get('/getAll', bookingController.getAllBookings);
router.post('/create', bookingController.createBooking);
router.delete('/delete',bookingController.deleteBooking);

module.exports = router;