import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";
import "../config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});