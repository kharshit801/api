const mongoose = require('mongoose');

const connectNotifications = mongoose.createConnection(process.env.MONGODB_NOTIFICATION);
const connectStudentDetails = mongoose.createConnection(process.env.MONGODB_STUDENT);
const connectAttendanceDetails = mongoose.createConnection(process.env.MOBGODB_ATTENDANCE);
const connectProffdetails = mongoose.createConnection(process.env.MONGODB_PROFDETAILS);
const connectClassSchedulesProff = mongoose.createConnection(process.env.MONGODB_CLASSSCHEDULEPROF);

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




