import db from "../db.js";
import moment from "moment";

export const createTask = (req, res) => {
  const q = `INSERT INTO tasks ("name","priorities","desc","status","deadline","projectId","memberId", "createdAt") VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const values = [
    req.body.name,
    req.body.priorities,
    req.body.desc,
    req.body.status,
    req.body.deadline,
    req.body.projectId,
    req.body.memberId,
    moment().toDate(),
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getTasks = (req, res) => {
  const q = `
   SELECT t.*, 
   u.id AS "userId",
   u.username,
   u."profilePic" 
   FROM tasks AS t JOIN users AS u ON (u.id=t."memberId") WHERE t."projectId"=$1
`;
  db.query(q, [req.query.projectId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getTask = (req, res) => {
  const q = `
   SELECT t.*, 
   u.id AS "userId",
   u.username AS "assigneeUserName",
   u."profilePic" AS "assigneeUserPic"
   FROM tasks AS t 
   JOIN users AS u ON (u.id=t."memberId") 
   WHERE t.id=$1
`;
  db.query(q, [req.query.taskId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows[0]);
  });
};

export const getUserTasks = (req, res) => {
  const q = `
   SELECT t.*,
   u.id AS "userId",
   u.username,
   u."profilePic"
   FROM tasks AS t JOIN users AS u ON (t."memberId"=u.id) WHERE t."memberId"=$1
`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const updateStatus = (req, res) => {
  const q = `
    UPDATE tasks SET "status"=$1 WHERE id=$2
`;
  db.query(q, [req.body.status, req.body.taskId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Update Successful");
  });
};

export const deleteTask = (req, res) => {
  const q = `
  DELETE FROM tasks WHERE id = $1
`;
  db.query(q, [req.query.taskId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted");
  });
};
