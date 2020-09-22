
const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

let db = mysql.createConnection({
  host: "localhost" ,
  user: "root" ,
  password: "rootroot" ,
  database: "Company" ,
  port: "3306"
})

app.get('/', (req, res) => {
  db.query("SELECT * FROM EMP", function(err,result,fields){

    let response = { "page": "home", "result" : result }
    res.send(JSON.stringify(response))
  }
)})

app.get('/users',(req, res) => {
  let response = {"page" : "users"}
  res.send(JSON.stringify(response))
})

app.get('/users/messages', (req,res) => {
  let response = {"page" : "messages"}
  res.send(JSON.stringify(response))
})

app.listen(port, () => {
    db.on('error', function(err) {
      console.log("[mysql error]",err);
    })

  console.log(`Example app listening at http://localhost:${port}`)
})
