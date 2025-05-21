import db from "../db.js";
import moment from "moment";

export const createComment = (req, res) => {
  const q = `INSERT INTO comments ("desc","taskId","userId","createdAt") VALUES ($1, $2,$3,$4) RETURNING *`;
  const values = [
    req.body.desc,
    req.body.taskId,
    req.body.userId,
    moment().toDate(),
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    const query = `
   SELECT c.*,
   u.id AS "userId",
   u.username,
   u."profilePic"
   FROM comments AS c 
   JOIN users AS u ON (u.id=c."userId") 
   WHERE c.id=$1 `;
    db.query(query, [data.rows[0].id], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result.rows[0]);
    });
  });
};

export const getComments = (req, res) => {
  const q = `
   SELECT c.*, 
   u.id AS "userId",
   u.username,
   u."profilePic" 
   FROM comments AS c JOIN users AS u ON (u.id=c."userId") WHERE c."taskId"=$1
`;
  db.query(q, [req.query.taskId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};
