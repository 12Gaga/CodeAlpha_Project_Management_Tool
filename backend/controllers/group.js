import db from "../db.js";
import moment from "moment";

export const createGroup = (req, res) => {
  const q = `INSERT INTO groups ("name", "createdAt") VALUES ($1, $2) RETURNING *`;
  const values = [req.body.groupName, moment().toDate()];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    const query = `INSERT INTO "groupMembers" ("groupId", "memberId") VALUES ($1, $2) RETURNING *`;
    const groupMemberIds = req.body.members;
    const completeAddUser = groupMemberIds.map((m) => {
      return new Promise((resolve, reject) => {
        db.query(query, [data.rows[0].id, m], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    });

    Promise.all(completeAddUser)
      .then(() => {
        return res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "Failed to add group members", details: err });
      });
  });
};

export const getGroups = (req, res) => {
  const q = `
    SELECT
      gm.*,
      g.id AS "groupId",
      g.name AS "groupName",
      u.id AS "userId",
      u.username,
      u."profilePic"
    FROM "groupMembers" AS gm
    JOIN "groups" AS g ON g.id = gm."groupId"
    JOIN "groupMembers" AS gm2 ON gm2."groupId" = g.id
    JOIN "users" AS u ON u.id = gm2."memberId"
    WHERE gm."memberId" = $1
    ORDER BY g.id;
  `;
  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getGroup = (req, res) => {
  const q = `
  SELECT gm.*,
         g.id AS "groupId",
         g.name AS "groupName",
         g."createdAt" AS "createdTime",
         u.id AS "userId",
         u.username,
         u."profilePic"
  FROM "groupMembers" AS gm
  JOIN "users" AS u ON gm."memberId" = u.id
  LEFT JOIN "groups" AS g ON g.id = gm."groupId"
  WHERE gm."groupId" = $1
`;
  db.query(q, [req.query.groupId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const deleteGroup = (req, res) => {
  const q = `
  DELETE FROM groups WHERE id = $1
`;
  db.query(q, [req.query.groupId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted");
  });
};
