import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await service.client.post("/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/todos");
        } catch {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-64 gap-2 border p-4 rounded-md shadow-md"
            >
                <input
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white py-1 rounded">
                    Login
                </button>
            </form>

            <button
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline my-2"
            >
                Don’t have an account? Register
            </button>
        </div>
    );
}
