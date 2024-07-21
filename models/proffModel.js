const mongoose = require('mongoose');
const {connectProffdetails}=require("../dbConfig");



const proffSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
});

let professor;

connectProffdetails.then(connection => {
  professor = connection.model('Professor', proffSchema);
});

module.exports = {
  getModel: () => professor
};