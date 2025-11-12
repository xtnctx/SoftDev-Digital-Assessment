import { Request, Response } from "express";
import { db } from "../../db";
import { users } from "../../db/schema";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import { eq } from "drizzle-orm";

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await hashPassword(password);
    const [newUser] = await db.insert(users).values({ name, email, password: hashed }).returning();
    const token = generateToken(newUser.id);
    res.json({ token });
};

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ token });
};
