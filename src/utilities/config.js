/*
  Ed Wied
  February 5, 2022
  CS 361 Final Project - What the Bing?!
*/

//global contants used for configuration
//pattern for sharing constants used from https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules

module.exports = Object.freeze({
    ENABLE_LOGGING: true,
    RUNNING_LOCAL: true,
    LOCAL_PORT: 5000,
    OSU_PORT: 13789,
    FILE_PATH_TO_WORDLIST: '/Users/edwied/development/OSU/What-the-Bing/CS361-FinalProject/NounListGenerator/wordlist.txt'
});
