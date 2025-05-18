import pkg from "pg";
const { Client } = pkg;

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "233253",
  database: "project-management-tool",
});

db.connect()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

export default db;
