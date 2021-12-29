const express = require('express');
const docs = require('@googleapis/docs')
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  console.log("looks like we had a redirect!")
  res.json({
    message:'oauth in progress'
  })
});

module.exports = router