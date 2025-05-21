import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTask, setNewTask] = useState('');
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

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
        if (!newTask.trim()) {
            setAddError('Task title is required.');
            return;
        }
        setAdding(true);
        try {
            const response = await api.post('/tasks', { title: newTask });
            setTasks([...tasks, response.data]);
            setNewTask('');
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

    if (loading) return <div className="text-center text-blue-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded shadow p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            <form onSubmit={handleAddTask} className="flex mb-4">
                <input
                    type="text"
                    placeholder="New task title"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l focus:outline-none"
                    disabled={adding}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition"
                    disabled={adding}
                >
                    {adding ? 'Adding...' : 'Add'}
                </button>
            </form>
            {addError && <div className="text-red-500 mb-2 text-center">{addError}</div>}
            {tasks.length === 0 ? (
                <div className="text-gray-500">No tasks found.</div>
            ) : (
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li key={task.id} className="p-3 border rounded flex justify-between items-center">
                            <span>
                                <strong>{task.title}</strong> - {task.status}
                            </span>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-500 hover:underline"
                                disabled={deletingId === task.id}
                            >
                                {deletingId === task.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;