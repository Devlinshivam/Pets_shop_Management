

var mysql = require('mysql2');
const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
// connection setup

app.use(cors());
app.use(express.json());

app.set("views", 'src');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306, // Default MySQL port
  user: process.env.MYSQL_USER || 'DBMS',
  password: process.env.MYSQL_PASSWORD || '1234',
  database: process.env.MYSQL_DATABASE || 'pets',
});

// connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to database');
});

app.post("/customers", (req, res) => {

  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log(results);

    res.send({
      results,
    })
  });


});

app.post("/pets", (req, res) => {

  connection.query('SELECT * FROM animals', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    res.send({
      results,
    })
  });


});


app.post("/vet", (req, res) => {

  connection.query('SELECT * FROM vet_service', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log(results);

    res.send({
      results,
    })
  });


});


app.post("/sales", (req, res) => {
  let r = [];
  let r2 =[];

  connection.query('SELECT * FROM petting', (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error fetching data');
          return;
      }
      r = results;
      // After the first query completes, execute the second query
      connection.query("SELECT SUM(cost) AS pro FROM petting", (err, results) => {
          if (err) {
              console.error('Error executing query:', err);
              res.status(500).send('Error fetching data');
              return;
          }
          r2 = results;
          // Once both queries are completed, send the response
          console.log(r2);
          res.send({
              r,
              r2
          });
      });
  });
});

app.post("/caretaker", (req, res) => {

  connection.query('SELECT * FROM caretaker', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log(results);

    res.send({
      results,
    })
  });


});

app.post("/phone", (req, res) => {

  console.log("yes")

  connection.query('SELECT number FROM phone_no where customer_id=' + req.body.customerId, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log(results);

    res.send({
      results,
    })
  });
});

app.post("/food", (req, res) => {
  connection.query('SELECT * FROM food_suitable where pet_id=' + req.body.pet_id, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({
      results,
    })
  });
});



app.post("/notify", (req, res) => {
  console.log('hi');
  connection.query('SELECT * FROM notify', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log(results);

    res.send({
      results,
    })
  });
});

app.post("/api/customers", (req, res) => {
  const { age, gender, name, address ,customer_id} = req.body;
  if (!age || !gender || !name || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'INSERT INTO customers (customer_id,age, gender, name, address) VALUES (?,?, ?, ?, ?)';
  connection.query(query, [customer_id,age, gender, name, address], (error, results, fields) => {
    
    const phoneNumbers = req.body.numbers.map(number => [customer_id, number]);

      connection.query('INSERT INTO phone_no (customer_id, number) VALUES ?', [phoneNumbers], function (error, results, fields) {
            
      })

    if (error) {
      console.error("Error inserting customer:", error);
      return res.status(500).json({ error: "Failed to insert customer" });
    }

    res.status(201).json({ message: "Customer created successfully" });
  });

  

});

app.post("/api/animals", (req, res) => {
  const { type, breed, weight, age ,id,gender,sold} = req.body;
  console.log('hi');
  if (!type || !breed || !weight || !age || !id || !gender) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'INSERT INTO animals (typed, breed, weight, age ,pet_id,gender,sold) VALUES (?,?,?,?, ?, ?, ?)';
  connection.query(query, [type, breed, weight, age ,id,gender,sold], (error, results, fields) => {
    
    const food_suitable = req.body.food_suitable.map(item => [id, item]);

      connection.query('INSERT INTO food_suitable (pet_id, suitable) VALUES ?', [food_suitable], function (error, results, fields) {
        console.log('aisehi');
      })

    if (error) {
      console.error("Error inserting customer:", error);
      return res.status(500).json({ error: "Failed to insert customer" });
    }

    res.status(201).json({ message: "Customer created successfully" });
  });
});

app.post("/api/transactions",(req,res)=>{
  const { animalId, customerId, cost, date} = req.body;

  // animalId: "",
  //   customerId: "",
  //   cost: "",
  //   date: "",

  connection.query('INSERT INTO petting (pet_id, customer_id, cost, bought_date) VALUES (?, ?, ?, ?)', 
  [animalId, customerId, cost, date], 
  function (error, results, fields) {
    if (error) throw error;
    console.log('Inserted successfully');
  });
  res.status(201).json({ message: "animal sold created successfully" });
})


// close connection on process exit
process.on('exit', () => {
  connection.end();
});