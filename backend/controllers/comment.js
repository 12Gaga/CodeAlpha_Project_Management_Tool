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

export const updateComment = (req, res) => {
  const q = `
    UPDATE comments SET "desc"=$1 WHERE "userId"=$2 AND "taskId"=$3 AND id=$4 RETURNING *
`;
  db.query(
    q,
    [req.body.desc, req.body.userId, req.body.taskId, req.body.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      const query = `
        SELECT c.*, 
        u.id AS "userId",
        u.username,
        u."profilePic" 
        FROM comments AS c JOIN users AS u ON (u.id=c."userId") WHERE c.id=$1
`;
      db.query(query, [data.rows[0].id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (data.rowCount > 0) return res.json(result.rows[0]);
        return res.status(403).json("You can update only your comment");
      });
    }
  );
};

export const deleteComment = (req, res) => {
  const q = `
    DELETE FROM comments WHERE "userId"=$1 AND "taskId"=$2 AND id=$3 RETURNING *
`;
  db.query(q, [req.body.userId, req.body.taskId, req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rowCount > 0) return res.json(req.body.id);
    return res.status(403).json("You can delete only your comment");
  });
};
