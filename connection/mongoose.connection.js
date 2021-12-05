const express = require('express');
const mongoose = require('mongoose');

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    var db = mongoose.connection;
  } catch (err) {
    db.on(
      'error',
      console.error.bind(console, 'MongoDB connection error: ' + err)
    );
  }
};

exports.mongooseConnection = mongooseConnection;
