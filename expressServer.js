const express = require('express');
const app = express();
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const fs = require('fs');

app.use(express.json());

app.get('/pets/:id', function(req,res){

    fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
        if (err) {  

            console.error(err.stack);

        } else {

            var pets = JSON.parse(petsJSON)
            let index = req.params.id;
            if (index >= pets.length || index < 0) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain')
                res.send('Not Found');

            } else {
                res.json(pets[index]);
            }
        }
    });
});

app.post('/pets', function(req,res) {
    res.send("testing");
    var newObj = req.body;

    fs.readFile(petsPath, 'utf8', function (err, petsJSON){
        if (err) {
            console.error(err.stack);
        } else {
            var pets = JSON.parse(petsJSON);
            pets.push(newObj);
            fs.writeFile(petsPath, JSON.stringify(pets), err => {
                if (err) {
                    console.error(err.stack)
                }
            })
        }
    })
})



app.listen(8000,function()
{
 console.log('Running')
});

