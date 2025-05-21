import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

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

    // Delete Task Handler
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
            <TaskForm
                task={newTask}
                onChange={handleAddTaskChange}
                onSubmit={handleAddTask}
                loading={adding}
                submitLabel="Add Task"
            />
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
    );
}

export default Dashboard;