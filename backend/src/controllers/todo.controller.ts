import { Response } from "express";
import { db } from "../../db";
import { todos } from "../../db/schema";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../middleware/auth";

export async function getTodos(req: AuthRequest, res: Response) {
    const data = await db.query.todos.findMany({ where: eq(todos.user_id, req.userId!) });
    res.json(data);
};

export async function addTodo(req: AuthRequest, res: Response) {
    const { title } = req.body;
    const [todo] = await db.insert(todos).values({ title, user_id: req.userId! }).returning();
    res.json(todo);
};

export async function deleteTodo(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const deleted = await db.delete(todos).where(eq(todos.id, Number(id))).returning();
    if (deleted.length === 0) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted" });
};

export async function toggleTodo(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const todo = await db.query.todos.findFirst({ where: eq(todos.id, Number(id)) });
    if (!todo || todo.user_id !== req.userId) return res.status(404).json({ message: "Todo not found" });

    const [updated] = await db.update(todos)
        .set({ is_done: !todo.is_done })
        .where(eq(todos.id, Number(id)))
        .returning();

    res.json(updated);
};
