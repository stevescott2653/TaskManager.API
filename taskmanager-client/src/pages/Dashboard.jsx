import React, { useEffect, useState } from 'react';
import api from '../api/api';

const STATUS_OPTIONS = ['ToDo', 'In Progress', 'Done'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', status: 'ToDo', priority: 'Medium' });
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editTask, setEditTask] = useState({});
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks');
                setTasks(response.data);
            } catch (err) {
                setError('Failed to load tasks.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        setAddError('');
        if (!newTask.title.trim()) {
            setAddError('Task title is required.');
            return;
        }
        setAdding(true);
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '', status: 'ToDo', priority: 'Medium' });
        } catch {
            setAddError('Failed to add task.');
        } finally {
            setAdding(false);
        }
    };

    const handleDeleteTask = async (id) => {
        setDeletingId(id);
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch {
            setError('Failed to delete task.');
        } finally {
            setDeletingId(null);
        }
    };

    const startEditTask = (task) => {
        setEditingId(task.id);
        setEditTask({ ...task });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async (id) => {
        try {
            const response = await api.put(`/tasks/${id}`, editTask);
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
            setEditingId(null);
        } catch {
            setError('Failed to update task.');
        }
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditTask({});
    };

    // Filtering
    const filteredTasks = filterStatus
        ? tasks.filter(task => task.status === filterStatus)
        : tasks;

    if (loading) return <div className="text-center text-blue-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={e => setNewTask(t => ({ ...t, title: e.target.value }))}
                    className="px-3 py-2 border rounded focus:outline-none"
                    disabled={adding}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={e => setNewTask(t => ({ ...t, description: e.target.value }))}
                    className="px-3 py-2 border rounded focus:outline-none"
                    disabled={adding}
                />
                <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={e => setNewTask(t => ({ ...t, dueDate: e.target.value }))}
                    className="px-3 py-2 border rounded focus:outline-none"
                    disabled={adding}
                />
                <select
                    name="status"
                    value={newTask.status}
                    onChange={e => setNewTask(t => ({ ...t, status: e.target.value }))}
                    className="px-3 py-2 border rounded focus:outline-none"
                    disabled={adding}
                >
                    {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={e => setNewTask(t => ({ ...t, priority: e.target.value }))}
                    className="px-3 py-2 border rounded focus:outline-none"
                    disabled={adding}
                >
                    {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition md:col-span-2"
                    disabled={adding}
                >
                    {adding ? 'Adding...' : 'Add Task'}
                </button>
            </form>
            {addError && <div className="text-red-500 mb-2 text-center">{addError}</div>}

            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Status:</label>
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    <option value="">All</option>
                    {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-gray-500">No tasks found.</div>
            ) : (
                <ul className="space-y-2">
                    {filteredTasks.map(task => (
                        <li key={task.id} className="p-3 border rounded flex flex-col md:flex-row md:items-center justify-between">
                            {editingId === task.id ? (
                                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                                    <input
                                        type="text"
                                        name="title"
                                        value={editTask.title}
                                        onChange={handleEditChange}
                                        className="px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={editTask.description}
                                        onChange={handleEditChange}
                                        className="px-2 py-1 border rounded"
                                    />
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editTask.dueDate ? editTask.dueDate.substring(0, 10) : ''}
                                        onChange={handleEditChange}
                                        className="px-2 py-1 border rounded"
                                    />
                                    <select
                                        name="status"
                                        value={editTask.status}
                                        onChange={handleEditChange}
                                        className="px-2 py-1 border rounded"
                                    >
                                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <select
                                        name="priority"
                                        value={editTask.priority}
                                        onChange={handleEditChange}
                                        className="px-2 py-1 border rounded"
                                    >
                                        {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <button
                                        onClick={() => handleEditSave(task.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleEditCancel}
                                        className="text-gray-500 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                                    <span className="font-semibold">{task.title}</span>
                                    <span className="text-gray-600">{task.description}</span>
                                    <span className="text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</span>
                                    <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">{task.status}</span>
                                    <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-800">{task.priority}</span>
                                </div>
                            )}
                            <div className="flex gap-2 mt-2 md:mt-0">
                                {editingId !== task.id && (
                                    <button
                                        onClick={() => startEditTask(task)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="text-red-500 hover:underline"
                                    disabled={deletingId === task.id}
                                >
                                    {deletingId === task.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;