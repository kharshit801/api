const mongoose = require('mongoose');

const connectNotifications = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/CollegeNotifications");
const connectStudentDetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/StudentDetails");
const connectAttendanceDetails = mongoose.createConnection("mongodb+srv://auxin:auxin@cluster0.xrg7sez.mongodb.net/AttendanceDetails");
const connectProffdetails = mongoose.createConnection();
const connectClassSchedulesProff = mongoose.createConnection();

const waitForConnection = (connection) => {
  return new Promise((resolve, reject) => {
    connection.on('connected', () => resolve(connection));
    connection.on('error', (err) => reject(err));
  });
};

module.exports = { 
  connectNotifications: waitForConnection(connectNotifications),
  connectStudentDetails: waitForConnection(connectStudentDetails),
  connectAttendanceDetails: waitForConnection(connectAttendanceDetails),
  connectProffdetails: waitForConnection(connectProffdetails),
  connectClassSchedulesProff: waitForConnection(connectClassSchedulesProff)

  
  
};




