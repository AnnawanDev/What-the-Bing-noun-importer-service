/*
  Ed Wied
  February 5, 2022
  CS 361 Final Project - What the Bing?!
  Noun-importer Service
*/


// set-up required modules -----------------------------------------------------
const express = require('express');
let cors = require('cors');
const fs = require('fs');
const _ = require('underscore');
const { RUNNING_LOCAL, LOCAL_PORT, OSU_PORT, LOCAL_FILE_PATH_TO_WORDLIST, OSU_FILE_PATH_TO_WORDLIST } = require('./utilities/config.js');
const { logIt } = require('./utilities/helperFunctions.js');

// set-up Express --------------------------------------------------------------
const app = express();
const port = RUNNING_LOCAL ? LOCAL_PORT : OSU_PORT;

//add Access-Control-Allow-Origin header so that API call is not blocked by CORS
app.use(cors({
    origin: '*'
}));

//set up endpoints
app.get('/', (req, res) => {
  res.status(200).send("What the Bing?! Noun-importer Service");
});

app.get('/words', async (req, res) => {
  const doesWordListExist = await doesFileExist();
  listOfWords = [];

  if (doesWordListExist) {
    listOfWords = await getWordList();
  } else {
    listOfWords = backUpWordList();
  }
  res.status(200).send(listOfWords);
});


//return 404 on anything else not found
app.get('*', (req, res) => {
  res.status(404).send("Hmmmm.... couldn't find that");
});


// start-up Express  -----------------------------------------------------------
app.listen(port, () => {
  logIt("What the Bing?! Noun-importer Service has started on port " + port);
});


// helper apis  ----------------------------------------------------------------
function doesFileExist() {
  return new Promise((resolve, reject) => {
    //method to check if file is there without opening it adapted from https://flaviocopes.com/how-to-check-if-file-exists-node/
    //February 5, 2022
    fs.access(getPathToWordList(), fs.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  });
}

function backUpWordList() {
  const wordsToGuess = ["basketball", "snow", "summer", "knight", "beach", "sword", "lake", "hawaii", "volcano", "mountain", "fish", "shark", "river", "horse", "cat", "penguin", "turtle", "laptop", "chess", "dog", "heart"];
  let wordsInNewOrder = _.shuffle(wordsToGuess);
  return wordsInNewOrder;
}

function getWordList() {
  return new Promise((resolve, reject) => {
    //method to read file adapted from https://nodejs.dev/learn/reading-files-with-nodejs
    //February 5, 2022
    fs.readFile(getPathToWordList(), 'utf8' , (err, data) => {
      if (err) {
        //console.error("getWordList() error: " + err)
        reject();
      } else {
        resolve(convertListToArray(data));
      }
    });
  });
}

function convertListToArray(someList) {
  let returnArray = [];
  //function adapted from https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/
  //February 5, 2022
  someList.split(/\r?\n/).forEach(line =>  {
    if (`${line}` != "") {
      // console.log(`Line from file: ${line}`);
      returnArray.push(`${line}`);
    }
  });

  return returnArray;
}

function getPathToWordList() {
  if (RUNNING_LOCAL) {
    return LOCAL_FILE_PATH_TO_WORDLIST;
  } else {
    return OSU_FILE_PATH_TO_WORDLIST
  }
}
