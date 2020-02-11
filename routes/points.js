const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("modify")
  })
  router.post("/point", (req, res) => {
    values = [req.body.title, req.body.description, req.body.image_url, req.body.lat, req.body.lng]
    db.query(`INSERT INTO points (title, description, image_url, latitude, longitude)
    VALUES($1, $2, $3, $4, $5) RETURNING *`, values)
    .then(data => res.json({error:false, new_point: data}) )
    .catch(data => res.json({error:true, new_point: data}) )
    })
  return router;
}
