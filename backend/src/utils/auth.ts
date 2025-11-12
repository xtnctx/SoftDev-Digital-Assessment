import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET!;

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};