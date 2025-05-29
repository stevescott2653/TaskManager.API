import React from 'react';

const STATUS_OPTIONS = ['ToDo', 'In Progress', 'Done'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

function TaskItem({
    task,
    isEditing,
    editTask,
    onEditChange,
    onEditSave,
    onEditCancel,
    onEditStart,
    onDelete,
    deleting,
}) {
    if (isEditing) {
        return (
            <tr className="bg-blue-50">
                <td className="py-2 px-3">
                    <input
                        type="text"
                        name="title"
                        value={editTask.title}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded w-full"
                    />
                </td>
                <td className="py-2 px-3">
                    <input
                        type="text"
                        name="description"
                        value={editTask.description}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded w-full"
                    />
                </td>
                <td className="py-2 px-3">
                    <input
                        type="date"
                        name="dueDate"
                        value={editTask.dueDate ? editTask.dueDate.substring(0, 10) : ''}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded w-full"
                    />
                </td>
                <td className="py-2 px-3">
                    <select
                        name="status"
                        value={editTask.status}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded w-full"
                    >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </td>
                <td className="py-2 px-3">
                    <select
                        name="priority"
                        value={editTask.priority}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded w-full"
                    >
                        {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </td>
                <td className="py-2 px-3 text-center flex flex-col md:flex-row gap-2 justify-center">
                    <button
                        onClick={onEditSave}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        onClick={onEditCancel}
                        className="text-gray-500 hover:underline"
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <tr className="hover:bg-gray-50 transition">
            <td className="py-2 px-3 font-semibold">{task.title}</td>
            <td className="py-2 px-3">{task.description}</td>
            <td className="py-2 px-3">
                {task.dueDate && !isNaN(new Date(task.dueDate)) ?
                    new Date(task.dueDate).toLocaleDateString() : ''}
            </td>
            <td className="py-2 px-3">
                <span className={`text-xs px-2 py-1 rounded font-semibold
                    ${task.status === 'Done' ? 'bg-green-100 text-green-700' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'}`}>
                    {task.status}
                </span>
            </td>
            <td className="py-2 px-3">
                <span className={`text-xs px-2 py-1 rounded font-semibold
                    ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'}`}>
                    {task.priority}
                </span>
            </td>
            <td className="py-2 px-3 text-center flex flex-col md:flex-row gap-2 justify-center">
                <button
                    onClick={onEditStart}
                    className="text-blue-600 hover:underline"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:underline"
                    disabled={deleting}
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;