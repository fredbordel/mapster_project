const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/favorites", (req, res) => {
    db.query(`SELECT * FROM favorites WHERE map_id = ${req.body.id}`)
    .then(data => res.json({error:false, new_point: data}))
    .catch(data => res.json({error:true, new_point: data}))
  });

  router.post("/favorites", (req, res) => {
    values = [req.body.id, 1]
    db.query(`INSERT INTO favorites (map_id, user_id) VALUES ($1, $2) RETURNING *`, values)
    .then(data => res.json({error:false, new_point: data}) )
    .catch(data => res.json({error:true, new_point: data}) )
    })
  return router;
};


