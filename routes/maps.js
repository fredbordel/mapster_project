// Route for the create page

const express = require('express');
const router  = express.Router();



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
    res.render("view_map", { mapId });
  })


  /** RESOURCE ROUTES  */

// What does this function do: CREATE
// This function adds a new map to database, then it redirects the user to the index page.
router.post("/create/map", (req, res) => {
  const values = [req.body.title, req.body.lat, req.body.long, req.body.zoomLevel, 1];
  db.query(`INSERT INTO maps (title, latitude, longitude, zoom_level, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *; `, values)
  .then((response) => {
    // let updatedResponse = response
    // updatedResponse.rows[0].user_id = 1
    res.send({redirectUrl: "/", response})
  })
});



// What does this function do: READ
// This function returns an array of map objects from the newest to oldest.
  router.get("/api/map/:id", (req, res) => {
    let mapId = req.params.id
    db.query('SELECT * FROM maps WHERE id = $1 ORDER BY id DESC;', [mapId]).then((response) => {
      res.send(response.rows);
    })
  })

  router.get("/api/maps", (req, res) => {
    db.query('SELECT * FROM maps ORDER BY id DESC;').then((response) => {
      // console.log(response)
      res.send(response.rows);
    })
  })

  router.get("/modify/map/:id", (req, res) => {
    let mapId = req.params.id
    res.render("modifyMap", { mapId });
  })

  router.get("/api/modify/map/:id/markers", (req, res) => {
    let mapId = req.params.id
    console.log(mapId)
    db.query("SELECT * FROM points WHERE map_id = $1", [mapId])
      .then(data => {
        console.log("data", data)
        res.json({data})
      })

  })


  router.post("/modify/map/:id", (req, res) => {
    let mapId = req.params.id

  })

  // TODO:
  // What does this function do: UPDATE
  // What does this function do: DELETE


  return router;
};




