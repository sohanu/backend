var express = require('express');
const router = express.Router();
var fs = require('fs');




router.post('/cartitems', (req, res) => {
    
    fs.readFile('cart.json', 'utf8', function readFileCallback(err, data){
        if (err){
            return res.status(404).send(err);
        } else {
        let obj = JSON.parse(data); //now it an object
        obj.items.push(req.body.data); //add some data
        let json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('cart.json', json, 'utf8',(err)=>{
            if(err){
                return res.status(404).send(err);
            }
            else{
                return res.status(200).send(json);
            }
        }); // write it back 
    }});
});

router.post('/cart', (req, res) => {
    fs.readFile('cart.json',function(err,data){
        if(err){
            return res.status(404).send(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //Read out the data to delete
        for(var i = 0; i < person.items.length;i++){
            if(req.body.name == person.items[i].name){
                //console.log(person.data[i])
                person.items.splice(i,1);
            }
        }
        
        
        var str = JSON.stringify(person);
        //Then write the data in
        fs.writeFile('cart.json',str,function(err){
            if(err){
                return res.status(404).send(err);
            }
            return res.status(200).send(str);
            
        })
    })
});

router.post('/cartclear', (req, res) => {
    fs.readFile('cart.json',function(err,data){
        if(err){
            return res.status(404).send(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //Read out the data to delete
        person.items.splice(0,person.items.length);
        
        var str = JSON.stringify(person);
        //Then write the data in
        fs.writeFile('cart.json',str,function(err){
            if(err){
                return res.status(404).send(err);
            }
            return res.status(200).send(str);
            
        })
    })
    
});
router.get('/cartitem', (req, res) => {
    fs.readFile('cart.json',"utf8", function(err, data) {
        if (err) {
            return res.status(500).send(err);
            
          }
          return res.status(200).send(data);
      });
});


module.exports = router;