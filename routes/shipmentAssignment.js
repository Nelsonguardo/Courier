const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

const shipmentAssignmentController = require('../controllers/shipmentAssignmentController');

router.post('/', check.auth, shipmentAssignmentController.createShipmentAssignment);

module.exports = router;