/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/api/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// app.get("/", (req, res) => {
//   const values = [req.session.userId]
//   db.query(`SELECT * FROM users WHERE id = $1`, values).then(data => {
//     const templateVars = {user: data.rows[0]};
//     res.render("index", templateVars);
//   })
