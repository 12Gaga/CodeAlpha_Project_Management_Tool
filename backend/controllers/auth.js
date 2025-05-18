import db from "../db.js";
import jwt from "jsonwebtoken";

export const getGoogleUser = async (req, res) => {
  const { token } = req.body;
  console.log("Received token:", token);

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Get user info from Google
    const decoded = jwt.decode(token);

    const { email, name, picture } = decoded;

    // Check if user exists in DB
    const q = "SELECT * FROM users WHERE username = $1";
    const result = await db.query(q, [name]);
    const user = result.rows[0];
    if (user) {
      return res.json({ message: "User exists", user });
    } else {
      const q = `INSERT INTO users ("username", "email", "profilePic") VALUES ($1, $2, $3)`;
      const values = [name, email, picture];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Succesfully Creating user");
      });
    }
  } catch (error) {
    console.error(
      "Auth error:",
      error.response?.data || error.message || error
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
