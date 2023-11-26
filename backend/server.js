const express = require('express');
const cors = require('cors')
const mysql = require('mysql');



const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '27Lewisodero',
  database: 'freelance'
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as ID ' + db.threadId);
});



app.post('/login', (req, res) =>{

  const sql = "SELECT * FROM login WHERE username = ? AND password = ?  ";;
 
  db.query(sql, [req.body.username,req.body.password], (err,data) => {
    if(err) return res.json('Error Login');
    if (data.length > 0) {
      return res.status(200).json({ message: 'Login Successful' });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  })
}) 


app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`)
})