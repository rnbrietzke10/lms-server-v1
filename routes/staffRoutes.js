const express = require('express');
const {
  getAllStaff,
  createStaffMember,
  getStaffMember,
  updateStaffMember,
  deleteStaffMember,
} = require('./../controllers/staffController');
const router = express.Router();

router.route('/').get(getAllStaff).post(createStaffMember);

router
  .route('/:id')
  .get(getStaffMember)
  .patch(updateStaffMember)
  .delete(deleteStaffMember);

module.exports = router;
