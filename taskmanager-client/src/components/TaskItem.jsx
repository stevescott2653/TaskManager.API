import React from 'react';

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
            <li className="p-3 border rounded flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                    <input
                        type="text"
                        name="title"
                        value={editTask.title}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editTask.description}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded"
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={editTask.dueDate ? editTask.dueDate.substring(0, 10) : ''}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded"
                    />
                    <select
                        name="status"
                        value={editTask.status}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="ToDo">ToDo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <select
                        name="priority"
                        value={editTask.priority}
                        onChange={onEditChange}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
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
                </div>
            </li>
        );
    }

    return (
        <li className="p-3 border rounded flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-semibold">{task.title}</span>
                <span className="text-gray-600">{task.description}</span>
                <span className="text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</span>
                <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">{task.status}</span>
                <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-800">{task.priority}</span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
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
            </div>
        </li>
    );
}

export default TaskItem;