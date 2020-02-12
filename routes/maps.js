// Route for the create page

const express = require('express');
const router  = express.Router();



// need to add some validation if the user is logged in from the cookie, if not redirec them to the homepage


module.exports = (db) => {
  router.get("/map", (req, res) => {
    const userId = req.params.id;
    // if (userId){
        res.render("create");
    // } else {
    //   alert("Please login to create a map");
    //   res.render("index");
    // }
     })


  router.get("/api/maps", (req, res) => {
    db.query('SELECT * FROM maps ORDER BY id DESC;').then((response) => {
      res.send(response.rows);
    })
  })

  router.post("/map", (req, res) => {
    const values = [req.body.title, req.body.lat, req.body.long, req.body.zoomLevel];
    db.query(`INSERT INTO maps (title, latitude, longitude, zoom_level) VALUES ($1, $2, $3, $4) RETURNING *; `, values).then((response) => {
      res.send({redirectUrl: "/", response})
    })
  });
  return router;
};


