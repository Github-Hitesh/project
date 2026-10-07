const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./models'); 

app.use(cors()); 
app.use(express.json()); 


db.sequelize.authenticate()
  .then(() => {
    console.log('MySQL Database connection established successfully.');
    
    return db.sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend server running smoothly on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the MySQL database:', err);
  });
