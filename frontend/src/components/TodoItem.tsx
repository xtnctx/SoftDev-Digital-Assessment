interface TodoItemProps {
    id: number;
    title: string;
    is_done: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ id, title, is_done, onToggle, onDelete }: TodoItemProps) {
    return (
        <li className="flex justify-between items-center gap-2 py-1">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={is_done}
                    onChange={() => onToggle(id)}
                    className="w-4 h-4"
                />
                <span className={is_done ? "line-through text-gray-500" : ""}>{title}</span>
            </label>
            <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700"
            >
                ❌
            </button>
        </li>
    );
}
