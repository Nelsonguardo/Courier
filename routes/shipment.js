const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

const { createShipment, updateShipmentStatus, getAllTrackShipmentStatusById , getOneTrackShipmentStatusById} = require('../controllers/shipmentController');

router.post('/', check.auth, createShipment);
router.put('/', check.auth, updateShipmentStatus);
router.get('/all', check.auth, getAllTrackShipmentStatusById);
router.get('/one', check.auth, getOneTrackShipmentStatusById);


module.exports = router;