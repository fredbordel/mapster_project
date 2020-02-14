const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/api/points/", (req, res) => {
    db.query('SELECT * FROM points ORDER BY id DESC')
      .then(data => {
        const points = data.rows;
        res.json(points);
  })
})


  router.get("/api/points/:id", (req, res) => {
    let mapId = req.params.id
    db.query('SELECT * FROM points WHERE map_id = $1;', [mapId])
      .then(data => {
        const points = data.rows;
        res.json(points);
  })
})
  router.post("/create/point", (req, res) => {
    const localStorageArr = req.body.storageArr
    for (let i = 0; i < localStorageArr.length; i++) {
     let values = [
       localStorageArr[i].title,
       localStorageArr[i].description,
       localStorageArr[i].image_url,
       localStorageArr[i].lat,
       localStorageArr[i].lng,
       localStorageArr[i].map_id
      ]
      db.query(`INSERT INTO points (title, description, image_url, latitude, longitude, map_id)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, values)
      .then(data => {
        if(i === localStorageArr.length-1){
          res.json({error:false, new_point: data})
        }
        })
      .catch(data => {
        if(i === localStorageArr.length-1){
          res.json({error:true, new_point: data})
        }
      })

      }
  })

  router.post("/modify/point/:id", (req , res) => {
    let values = [req.body.title, req.body.description, req.body.image_url, req.body.id];
    console.log(values)
    db.query(`UPDATE points
    SET title = $1,
        description = $2,
        image_url = $3
    WHERE id = $4 RETURNING *;`, values)
    .then(data => {
      res.json(data)
    }).catch(err => console.log(err))
  })



  return router;
}
