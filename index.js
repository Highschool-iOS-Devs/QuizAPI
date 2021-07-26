const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const { json } = require('body-parser')

const unlinkAsync = promisify(fs.unlink)
const app = express()
const port = process.env.PORT || 3001
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
      callback(null, file.originalname)
  }
});
var text = "...";
var quiz = json;

app.post('/postText', function(req, res) {
    text = req.query.text
    res.send(text)
    return 'hello'
})
app.get('/getText', function(req, res) {
    res.send(text)
    return 'hello'
})
app.post('/postQuiz', function(req, res) {
    quiz = req.query
    text = "..."
    res.send({"quiz": quiz})
    return 'hello'
})
app.get('/getQuiz', function(req, res) {
    res.send({"quiz": quiz})
    return 'hello'
})
app.listen(port)
console.log('Server started successfully on port ' + port + "!")