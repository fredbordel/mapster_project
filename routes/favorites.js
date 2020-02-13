const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/favorites", (req, res) => {
    db.query(`SELECT * FROM maps WHERE id IN (SELECT map_id FROM favorites WHERE user_id = $1)`, [1])
    .then((response) => {res.send(response.rows);})
    .catch(data => res.json({error:true, favorite: data}))
  });

  router.post("/favorites", (req, res) => {
    values = [req.body.id, 1]
    db.query(`INSERT INTO favorites (map_id, user_id) VALUES ($1, $2) RETURNING *`, values)
    .then(data => res.json({error:false, favorite: data}) )
    .catch(data => res.json({error:true, favorite: data}) )
    })

// IM TRYING HERE


// router.get("/favorites", (req, res) => {
//    db.query(`SELECT * FROM maps WHERE id IN (SELECT map_id  FROM favorites ORDER BY id DESC LIMIT 1);`)
//     .then((response) => res.send(response.rows))
// });


// IM TRYING HERE



  return router;


};


