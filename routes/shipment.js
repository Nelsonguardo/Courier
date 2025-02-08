const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

const { createShipment, updateShipmentStatus, TrackShipmentStatus } = require('../controllers/shipmentController');

router.post('/', check.auth, createShipment);
router.put('/', check.auth, updateShipmentStatus);
router.get('/', check.auth, TrackShipmentStatus);

module.exports = router;