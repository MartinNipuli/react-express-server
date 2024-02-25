const express = require('express');
const cors = require("cors")
const app = express(); 
const port = process.env.PORT || 4000; 

app.use(cors())

app.get('/express_data', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  fetch('https://api.porssisahko.net/v1/latest-prices.json')
        .then((response) => response.json())
        .then((data)=>{
          res.send(data)
          console.log(data)
        })
        .catch((err)=>{
          console.log(err.message);
        })
  
      });

app.listen(port, () => console.log(`Listening on port ${port}`));