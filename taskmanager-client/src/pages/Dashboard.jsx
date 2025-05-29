import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['ToDo', 'In Progress', 'Done'];

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

    // Get token from localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(response.data);
            } catch (err) {
                setError('Failed to load tasks.');
                toast.error('Failed to load tasks.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [token]);

    // Add Task Handlers
    const handleAddTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        setAddError('');
        if (!newTask.title.trim()) {
            setAddError('Task title is required.');
            toast.error('Task title is required.');
            return;
        }
        setAdding(true);
        try {
            const response = await api.post('/tasks', newTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '', status: 'ToDo', priority: 'Medium' });
            toast.success('Task added!');
        } catch (err) {
            setAddError('Failed to add task.');
            toast.error('Failed to add task.');
        } finally {
            setAdding(false);
        }
    };

    // Delete Task Handler
    const handleDeleteTask = async (id) => {
        setDeletingId(id);
        try {
            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.filter(task => task.id !== id));
            toast.success('Task deleted!');
        } catch {
            setError('Failed to delete task.');
            toast.error('Failed to delete task.');
        } finally {
            setDeletingId(null);
        }
    };

    // Edit Task Handlers
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
            const response = await api.put(`/tasks/${id}`, editTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
            setEditingId(null);
            toast.success('Task updated!');
        } catch {
            setError('Failed to update task.');
            toast.error('Failed to update task.');
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

    return (
        <div className="flex justify-center items-start min-h-[80vh] bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10 mt-10">
                <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center tracking-tight">Your Tasks</h2>
                <div className="mb-8">
                    <TaskForm
                        task={newTask}
                        onChange={handleAddTaskChange}
                        onSubmit={handleAddTask}
                        loading={adding}
                        submitLabel="Add Task"
                    />
                    {addError && <div className="text-red-500 mb-2 text-center">{addError}</div>}
                </div>
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <label className="font-semibold mb-2 md:mb-0">Filter by Status:</label>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="px-2 py-1 border rounded w-full md:w-48"
                    >
                        <option value="">All</option>
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                {loading ? (
                    <div className="text-center text-blue-500">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <TaskList
                            tasks={filteredTasks}
                            editingId={editingId}
                            editTask={editTask}
                            onEditChange={handleEditChange}
                            onEditSave={handleEditSave}
                            onEditCancel={handleEditCancel}
                            onEditStart={startEditTask}
                            onDelete={handleDeleteTask}
                            deletingId={deletingId}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;