import express from "express";
import { authenticate } from "../middleware/auth";
import { getTodos, addTodo, deleteTodo, toggleTodo } from "../controllers/todo.controller";

const router = express.Router();
router.use(authenticate);

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", toggleTodo);

export default router;