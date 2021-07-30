var express = require('express');
const router = express.Router();
var fs = require('fs');
const items=require('../product.json');

//----------------------------------------------------get meds api-------------------------------------------------------------------------

router.get('/items', (req, res) => {
    fs.readFile('product.json',"utf8", function(err, data) {
        if (err) {
            return res.status(500).send(err);
            
          }
          return res.status(200).send(data);
      });
});

router.get('/items/:name', (req, res) => {
    fs.readFile('product.json',"utf8", function(err, data) {
        if (err) {
            return res.status(500).send(err);
            
          }
          const item = JSON.parse(data);
          for (let i = 0; i < 2; i++) {
              if(item.results[i].name==req.params.name){
                return res.status(200).send(item.results[i].subitemsData);
              }
              
          }
         
      });
});


module.exports = router;