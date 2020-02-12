// Route for the create page

const express = require('express');
const router  = express.Router();
const mapclickPopup = require("../public/scripts/addPoint")



// need to add some validation if the user is logged in from the cookie, if not redirec them to the homepage


module.exports = (db) => {


  /** VIEW ROUTES  */


  router.get("/create/map", (req, res) => {
    // const userId = req.params.id;
    // if (userId){
        res.render("create");
    // } else {
    //   alert("Please login to create a map");
    //   res.render("index");
    // }
     })


  router.get("/map/:map_id", (req, res) => {
    let mapId = req.params.map_id
    console.log(mapId);
    res.render("view_map", { mapId });
  })


  /** RESOURCE ROUTES  */

// What does this function do: CREATE
// This function adds a new map to database, then it redirects the user to the index page.
router.post("/create/map", (req, res) => {
  const values = [req.body.title, req.body.lat, req.body.long, req.body.zoomLevel];
  db.query(`INSERT INTO maps (title, latitude, longitude, zoom_level) VALUES ($1, $2, $3, $4) RETURNING *; `, values)
  .then((response) => {
    res.send({redirectUrl: "/", response})
  })
});



// What does this function do: READ
// This function returns an array of map objects from the newest to oldest.
  router.get("/api/maps/:id", (req, res) => {
    let mapId = req.params.id
    db.query('SELECT * FROM maps WHERE id = $1 ORDER BY id DESC;', [mapId]).then((response) => {
      res.send(response.rows);
    })
  })

  router.get("/api/maps", (req, res) => {
    db.query('SELECT * FROM maps ORDER BY id DESC;').then((response) => {
      res.send(response.rows);
    })
  })




  // TODO:
  // What does this function do: UPDATE
  // What does this function do: DELETE


  return router;
};




