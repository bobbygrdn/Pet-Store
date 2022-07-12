const express = require("express");
const app = express();

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '',
    database: "pets_shop"
})

app.use(express.json());

app.post("/pets", async (req, res) => {
  let obj = req.body;
  try {
    const data = await pool.query(`INSERT INTO pets (name, age, kind) VALUES ('${obj.name}', '${obj.age}', '${obj.kind}');`)
    res.send('Created pet!')
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/pets", async (req, res) => {
  try { 
    const data = await pool.query('SELECT * FROM pets;')
    res.send(data.rows)     
  } catch (err) {
    console.error(err.message)
  }
});

app.get('/pets/:id', async (req, res) =>{
  let id = req.params.id;
  try {
      const data = await pool.query('SELECT * FROM pets;')
      if(id>= data.rows.length) {
        res.statusCode = 404;
        res.header("Content-Type", "text/plain");
        res.end("Could Not Find Pet");
      }
      res.send(data.rows[id])
    } catch (err) {
      console.error(err.message)
    }  
})

app.patch('/pets/:id', async (req, res) => {
  let id = req.params.id;
  let obj = req.body;

  if(obj.name) {
    try {
      const info = await pool.query(`UPDATE pets SET name = '${obj.name}' WHERE id = '${id}';`)
      res.send("Updated name")
    } catch (err) {
      console.error(err.message)
    }
  } else if(obj.age) {
    try {
      const info = await pool.query(`UPDATE pets SET age = '${obj.age}' WHERE id = '${id}';`)
      res.send("Updated age")
    } catch (err) {
      console.error(err.message)
    }
  }else if(obj.kind) {
    try {
      const info = await pool.query(`UPDATE pets SET kind = '${obj.kind}' WHERE id = '${id}';`)
      res.send("Updated kind")
    } catch (err) {
      console.error(err.message)
    }
  } else {
    console.error(err.message)
  }
  
})

app.delete('/pets/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const info = await pool.query(`DELETE FROM pets WHERE id = '${id}'`)
    if(id>= info.rows.length) {
      res.statusCode = 404;
      res.header("Content-Type", "text/plain");
      res.end("Could Not Find Pet");
    }
    res.send("Deleted pet")
  } catch (err) {
    console.error(err.message)
  }
})

app.use((req, res, next) => {
  res.status(500).send("Internal Server Error");
})

app.listen(8000, function () {
  console.log("Running");
});

