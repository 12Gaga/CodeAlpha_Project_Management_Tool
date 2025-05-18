import db from "../db.js";
import moment from "moment";

export const createGroup = (req, res) => {
  const q = `INSERT INTO groups ("name", "createdAt") VALUES ($1, $2)`;
  const values = [
    req.body.name,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log("data", data);
    return res.status(200).json("Succesfully Creating group");
  });
};
