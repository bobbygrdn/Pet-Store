const express = require("express");
const app = express();
const path = require("path");
const petsPath = path.join(__dirname, "pets.json");
const fs = require("fs");

app.use(express.json());

app.post("/pets", (req, res) => {
  
    var newObj = req.body;
  
    if (newObj.age === '' || newObj.kind === '' || newObj.name === '') {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain");
      res.send("Bad request");
    } else {
      res.send("Added new animal");
      fs.readFile(petsPath, "utf8", (err, petsJSON) => {
        if (err) {
          console.error(err.stack);
        } else {
          var pets = JSON.parse(petsJSON);
          pets.push(newObj);
  
          fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
            if (err) {
              console.error(err.stack);
            }
          });
        }
      });
    }
  });

app.get("/pets/:id", (req, res) => {
    fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    
            if (err) {
                console.error(err.stack);
            } else {
            var pets = JSON.parse(petsJSON);
            let index = req.params.id;

                if (index >= pets.length || index < 0) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.send("Not Found");
                } else {
                    res.json(pets[index]);
                };
            };
     });
});

app.patch("/pets/:id", (req,res) => {
    
        fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
            if(err) {
                console.error(err.stack);
            } else {
                res.send("Updated animal");
                var newObj = req.body;
                let index = req.params.id;
                var pets = JSON.parse(petsJSON);
                var update = pets[index];

                if (update.age !== Number || update.kind === '' || newObj.name === '') {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.send("Bad request");
                } else {
                    update.name = newObj.name;
                
                    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
                        if (err) {
                        console.error(err.stack);
                        };
                    });
                };
            };
        });
});

app.delete("/pets/:id", (req,res) => {
    
    fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
        if(err) {
            console.error(err.stack);
        } else {
            res.send("Deleting animal");
            let index = req.params.id;
            var pets = JSON.parse(petsJSON);
            pets.splice(index, 1)
            
            fs.writeFile(petsPath, JSON.stringify(pets), ()=> {
                if(err) {
                    console.error(err.stack);
                };
            });
        };
    });
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
})

app.listen(8000, function () {
  console.log("Running");
});

