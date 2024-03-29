const fs = require('fs');

const staff = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/staff.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Staff id is: ${val}`);
  if (val * 1 > staff.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing First Name, Last Name or email',
    });
  }
  next();
};

exports.getAllStaff = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: staff.length, data: { staff } });
};

exports.getStaffMember = (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      staffMember,
    },
  });
};

exports.createStaffMember = (req, res) => {
  const newId = staff[staff.length - 1].id + 1;

  const newStaff = Object.assign({ id: newId }, req.body);
  staff.push(newStaff);

  fs.writeFile(
    `${__dirname}/dev-data/staff.json`,
    JSON.stringify(staff),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          staff: newStaff,
        },
      });
    }
  );
};

exports.updateStaffMember = (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find(el => el.id === id);

  // TODO: implement when db is set up
  res.status(200).json({
    status: 'success',
    data: 'updated staff member object',
  });
};

exports.deleteStaffMember = (req, res) => {
  //   const id = req.params.id * 1;
  //   const staffMember = staff.find(el => el.id === id);

  // TODO: implement when db is set up
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
