const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get('/', (req, res) => {
   const userId = req.params.id;
    let templateVars = {userId}
    res.render('index', templateVars);
    // how to redirect to the home page and pass in template vars?
  });
  return router;
};

