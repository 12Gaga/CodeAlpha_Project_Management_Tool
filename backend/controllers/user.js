import db from "../db.js";

export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE username = $1";
  db.query(q, [req.query.name], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};
