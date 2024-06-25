var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use the environment variable PORT or default to 5000

// Connection setup
app.use(cors());
app.use(express.json());
app.set('views', 'src');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306, // Default MySQL port
  user: process.env.MYSQL_USER || 'DBMS',
  password: process.env.MYSQL_PASSWORD || '1234',
  database: process.env.MYSQL_DATABASE || 'pets',
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to database');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'my-app/build')));

// Define API routes
app.post('/api/customers', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/pets', (req, res) => {
  connection.query('SELECT * FROM animals', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/vet', (req, res) => {
  connection.query('SELECT * FROM vet_service', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/sales', (req, res) => {
  let r = [];
  let r2 = [];
  connection.query('SELECT * FROM petting', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    r = results;
    connection.query('SELECT SUM(cost) AS pro FROM petting', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching data');
        return;
      }
      r2 = results;
      res.send({ r, r2 });
    });
  });
});

app.post('/api/caretaker', (req, res) => {
  connection.query('SELECT * FROM caretaker', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/phone', (req, res) => {
  connection.query('SELECT number FROM phone_no WHERE customer_id = ?', [req.body.customerId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/food', (req, res) => {
  connection.query('SELECT * FROM food_suitable WHERE pet_id = ?', [req.body.pet_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/notify', (req, res) => {
  connection.query('SELECT * FROM notify', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.send({ results });
  });
});

app.post('/api/customers', (req, res) => {
  const { age, gender, name, address, customer_id } = req.body;
  if (!age || !gender || !name || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO customers (customer_id, age, gender, name, address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [customer_id, age, gender, name, address], (error, results) => {
    if (error) {
      console.error('Error inserting customer:', error);
      return res.status(500).json({ error: 'Failed to insert customer' });
    }

    const phoneNumbers = req.body.numbers.map(number => [customer_id, number]);
    connection.query('INSERT INTO phone_no (customer_id, number) VALUES ?', [phoneNumbers], (error) => {
      if (error) {
        console.error('Error inserting phone numbers:', error);
        return res.status(500).json({ error: 'Failed to insert phone numbers' });
      }
    });

    res.status(201).json({ message: 'Customer created successfully' });
  });
});

app.post('/api/animals', (req, res) => {
  const { type, breed, weight, age, id, gender, sold } = req.body;
  if (!type || !breed || !weight || !age || !id || !gender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO animals (typed, breed, weight, age, pet_id, gender, sold) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [type, breed, weight, age, id, gender, sold], (error, results) => {
    if (error) {
      console.error('Error inserting animal:', error);
      return res.status(500).json({ error: 'Failed to insert animal' });
    }

    const food_suitable = req.body.food_suitable.map(item => [id, item]);
    connection.query('INSERT INTO food_suitable (pet_id, suitable) VALUES ?', [food_suitable], (error) => {
      if (error) {
        console.error('Error inserting food suitable:', error);
        return res.status(500).json({ error: 'Failed to insert food suitable' });
      }
    });

    res.status(201).json({ message: 'Animal created successfully' });
  });
});

app.post('/api/transactions', (req, res) => {
  const { animalId, customerId, cost, date } = req.body;

  connection.query('INSERT INTO petting (pet_id, customer_id, cost, bought_date) VALUES (?, ?, ?, ?)', 
  [animalId, customerId, cost, date], 
  (error, results) => {
    if (error) {
      console.error('Error inserting transaction:', error);
      return res.status(500).json({ error: 'Failed to insert transaction' });
    }
    res.status(201).json({ message: 'Transaction created successfully' });
  });
});

// Catch all other routes and return the React app's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
});

// Close connection on process exit
process.on('exit', () => {
  connection.end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
