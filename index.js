const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing the routes
const submitAttendanceRouter = require("./routes/submitAttendance");
const professorScheduleRouter = require("./routes/professorSchedule")
const pushNotificationRouter = require("./routes/pushNotifications");
const studentDetailsRouter = require("./routes/studentDetails");
const loginRouter = require("./routes/login");
const ProfileRouter = require('./routes/profile');

const { connectStudentDetails,connectClassSchedulesProff,connectNotifications ,connectProffdetails} = require("./dbConfig");

Promise.all([
  connectNotifications,
  connectProffdetails,
  connectStudentDetails,
  connectClassSchedulesProff,
  connectAttendanceDetails
]).then(() => {
  console.log("All database connections established")});



// Endpoint for login
app.use("/login", loginRouter);


// Endpoint for submitting attendance
app.use("/submitAttendance",submitAttendanceRouter );

//End point for pushing notification
app.use("/pushNotification", pushNotificationRouter);

// Endpoint for fetching student details
app.use("/students", studentDetailsRouter);

app.use('/api/profile', ProfileRouter);

app.use("/api/professorSchedule",professorScheduleRouter );

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
