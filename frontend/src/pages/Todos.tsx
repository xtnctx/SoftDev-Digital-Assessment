import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";
import TodoItem from "../components/TodoItem";

interface Todo {
    id: number;
    title: string;
    is_done: boolean;
}

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    async function fetchTodos() {
        try {
            const res = await service.client.get("/todos");
            setTodos(res.data);
        } catch {
            alert("Please log in again");
            navigate("/login");
        }
    }

    async function addTodo() {
        if (!title.trim()) return;
        await service.client.post("/todos", { title });
        setTitle("");
        fetchTodos();
    }

    async function deleteTodo(id: number) {
        await service.client.delete(`/todos/${id}`);
        fetchTodos();
    }

    async function toggleTodo(id: number) {
        await service.client.patch(`/todos/${id}/toggle`);
        fetchTodos();
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="w-96 mx-auto mt-10">
            <h2 className="text-lg font-medium">Todos</h2>
            <div className="flex gap-2 mt-2">
                <input
                    placeholder="New todo"
                    value={title}
                    className="border rounded flex-1 px-2 py-1"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>
            <ul className="mt-4">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        is_done={todo.is_done}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}
