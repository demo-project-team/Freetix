import e from "express";
import cors from "cors";
const app = e();
app.use(cors());
const PORT = 4000;
app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Express!");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
