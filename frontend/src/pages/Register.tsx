import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await service.client.post("/register", form);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-64 gap-2 border p-4 rounded-md shadow-md"
            >
                <input
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded"
                />
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
                <button type="submit" className="bg-green-500 text-white py-1 rounded">
                    Register
                </button>
            </form>

            <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline my-2"
            >
                Already have an account? Login
            </button>
        </div>
    );
}
