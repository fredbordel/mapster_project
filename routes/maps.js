// Route for the create page

const express = require('express');
const router  = express.Router();
const mapclickPopup = require("../public/scripts/addPoint")



// need to add some validation if the user is logged in from the cookie, if not redirec them to the homepage


module.exports = (db) => {
  router.get("/map", (req, res) => {
        res.render("create");
     })


  router.get("/api/maps", (req, res) => {
    db.query('SELECT * FROM maps ORDER BY id DESC;').then((response) => {
      res.send(response.rows);
    })
  })

  router.post("/map", (req, res) => {

    const values = [req.body.title, req.body.lat, req.body.long, req.body.zoomLevel];
    // console.log(values)

    db.query(`INSERT INTO maps (title, latitude, longitude, zoom_level) VALUES ($1, $2, $3, $4) RETURNING *; `, values).then((response) => {


      console.log("response", response)
      res.send({redirectUrl: "/", response})
    })


  });
  return router;
};



// router.get("/", (req, res) => {
//   db.query(`SELECT * FROM users;`)
//     .then(data => {
//       const users = data.rows;
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
// return router;
// };
