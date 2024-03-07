const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const exp = require('constants');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

const staff = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/staff.json`));
const courses = [];
// Route Handlers
const getAllStaff = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: staff.length, data: { staff } });
};

const getStaffMember = (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find((el) => el.id === id);

  if (!staffMember) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      staffMember,
    },
  });
};

const createStaffMember = (req, res) => {
  const newId = staff[staff.length - 1].id + 1;

  const newStaff = Object.assign({ id: newId }, req.body);
  staff.push(newStaff);

  fs.writeFile(
    `${__dirname}/dev-data/staff.json`,
    JSON.stringify(staff),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          staff: newStaff,
        },
      });
    }
  );
};

const updateStaffMember = (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find((el) => el.id === id);

  if (!staffMember) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  // TODO: implement when db is set up
  res.status(200).json({
    status: 'success',
    data: 'updated staff member object',
  });
};

const deleteStaffMember = (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find((el) => el.id === id);

  if (!staffMember) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  // TODO: implement when db is set up
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllCourses = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const getCourse = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const createCourse = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const updateCourse = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const deleteCourse = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

// GET staff member by id
// app.get('/api/v1/staff/:id', getStaffMember);

// create staff memeber
// app.post('/api/v1/staff', createStaffMember);

// Update staff member
// app.patch('/api/v1/staff/:id', updateStaffMember);

// Delete Staff member
// app.delete('/api/v1/staff/:id', deleteStaffMember);

// Routes

const staffRouter = express.Router();

const courseRouter = express.Router();

staffRouter.route('/').get(getAllStaff).post(createStaffMember);

staffRouter
  .route('/:id')
  .get(getStaffMember)
  .patch(updateStaffMember)
  .delete(deleteStaffMember);

courseRouter.route('/').get(getAllCourses).post(createCourse);

courseRouter
  .route('/:id')
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/courses', courseRouter);

// Start Server
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
