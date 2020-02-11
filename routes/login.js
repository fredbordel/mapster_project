const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get('/login/:id', (req, res) => {
   const userId = req.params.id;
   console.log(userId)
    let templateVars = {userId}
    req.session.userId = userId;
    res.redirect('/');
    // how to redirect to the home page and pass in template vars?
  });
  return router;
};

