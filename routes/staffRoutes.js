const express = require('express');
const {
  getAllStaff,
  createStaffMember,
  getStaffMember,
  updateStaffMember,
  deleteStaffMember,
  checkBody,
  checkId,
} = require('./../controllers/staffController');
const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllStaff).post(checkBody, createStaffMember);

router
  .route('/:id')
  .get(getStaffMember)
  .patch(updateStaffMember)
  .delete(deleteStaffMember);

module.exports = router;
