
// Get route renders homepage
const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
  res.render("index");
});

return router;
};
