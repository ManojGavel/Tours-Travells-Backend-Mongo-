const express = require('express');
const router = express.Router();
const TravellController = require('./../Controllers/TravellController');

router.route('/').get(TravellController.getAllTravells).post(TravellController.createTravell);
router.route('/:id').get(TravellController.getTravell).patch(TravellController.updateTravell).delete(TravellController.deleteTravell);

module.exports = router;