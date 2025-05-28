import React, { useEffect, useState, useContext } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { AuthContext } from '../auth/AuthContext';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../api/api';

const initialTask = {
    title: '',
    description: '',
    dueDate: '',
    status: 'ToDo',
    priority: 'Medium'
};

function Dashboard() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(initialTask);
    const [loading, setLoading] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTask, setEditTask] = useState(initialTask);
    const [deletingId, setDeletingId] = useState(null);

    const fetchTasks = async () => {
        const res = await getTasks(token);
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        await createTask(task, token);
        setTask(initialTask);
        setLoading(false);
        fetchTasks();
    };

    const handleEditStart = t => {
        setEditingTaskId(t.id);
        setEditTask({ ...t });
    };

    const handleEditChange = e => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };

    const handleEditSave = async id => {
        setLoading(true);
        await updateTask(editTask, token);
        setEditingTaskId(null);
        setEditTask(initialTask);
        setLoading(false);
        fetchTasks();
    };

    const handleEditCancel = () => {
        setEditingTaskId(null);
        setEditTask(initialTask);
    };

    const handleDelete = async id => {
        setDeletingId(id);
        await deleteTask(id, token);
        setDeletingId(null);
        fetchTasks();
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
            <TaskForm
                task={task}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                submitLabel="Add Task"
            />
            <TaskList
                tasks={tasks}
                onEditStart={handleEditStart}
                onEditChange={handleEditChange}
                onEditSave={handleEditSave}
                onEditCancel={handleEditCancel}
                editingTaskId={editingTaskId}
                editTask={editTask}
                onDelete={handleDelete}
                deletingId={deletingId}
            />
        </div>
    );
}

export default Dashboard;