import React from 'react';

const STATUS_OPTIONS = ['ToDo', 'In Progress', 'Done'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

function TaskForm({ task, onChange, onSubmit, loading, submitLabel = "Add Task" }) {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none"
                disabled={loading}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none"
                disabled={loading}
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none"
                disabled={loading}
            />
            <select
                name="status"
                value={task.status}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none"
                disabled={loading}
            >
                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select
                name="priority"
                value={task.priority}
                onChange={onChange}
                className="px-3 py-2 border rounded focus:outline-none"
                disabled={loading}
            >
                {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition md:col-span-2"
                disabled={loading}
            >
                {loading ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}

export default TaskForm;