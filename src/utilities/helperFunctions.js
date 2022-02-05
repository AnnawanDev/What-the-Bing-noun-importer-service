/*
  Ed Wied
  February 5, 2022
  CS 361 Final Project - What the Bing?!
*/

const { ENABLE_LOGGING } = require('./config.js');

//common function to log messages to console rather than use console.log for everyone
function logIt(someMessage) {
  if (ENABLE_LOGGING) {
    console.log(someMessage);
  }
}

module.exports = {
  logIt
}
