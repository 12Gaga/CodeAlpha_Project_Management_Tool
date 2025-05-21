import db from "../db.js";
import moment from "moment";

export const createProject = (req, res) => {
  const q = `INSERT INTO projects ("name","groupId","desc", "createdAt") VALUES ($1, $2,$3,$4) RETURNING *`;
  const values = [
    req.body.name,
    req.body.groupId,
    req.body.desc,
    moment().toDate(),
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getProjects = (req, res) => {
  const q = `
   SELECT * FROM projects WHERE "groupId"=$1
`;
  db.query(q, [req.query.groupId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getProject = (req, res) => {
  const q = `
  SELECT p.* ,g.id AS "groupId",
         g.name AS "groupName",
         g."createdAt" AS "createdTime",
         u.id AS "userId",
         u.username,
         u."profilePic"
  FROM "projects" AS p
  JOIN "groups" AS g ON p."groupId" = g.id
  JOIN "groupMembers" AS gm ON gm."groupId" = g.id
 JOIN "users" AS u ON gm."memberId" = u.id
  WHERE p.id = $1
`;
  db.query(q, [req.query.projectId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getUserProjects = (req, res) => {
  const q = `
  SELECT p.* 
  FROM "groupMembers" AS gm
  JOIN "groups" AS g ON gm."groupId" = g.id
  JOIN "projects" AS p ON p."groupId" = g.id
  WHERE gm."memberId" = $1
`;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};
