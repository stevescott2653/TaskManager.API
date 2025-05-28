import React, { useState, useContext } from "react";
import { createTask, updateTask } from "../api/api";
import { AuthContext } from "../auth/AuthContext";

const STATUS_OPTIONS = ['ToDo', 'In Progress', 'Done'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

const TaskForm = ({ selectedTask, onSuccess }) => {
  const [title, setTitle] = useState(selectedTask ? selectedTask.title : "");
  const [description, setDescription] = useState(selectedTask ? selectedTask.description : "");
  const [dueDate, setDueDate] = useState(selectedTask ? selectedTask.dueDate : "");
  const [status, setStatus] = useState(selectedTask ? selectedTask.status : STATUS_OPTIONS[0]);
  const [priority, setPriority] = useState(selectedTask ? selectedTask.priority : PRIORITY_OPTIONS[0]);
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, status, priority };
    if (selectedTask) {
      await updateTask({ ...selectedTask, ...taskData }, token);
    } else {
      await createTask(taskData, token);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="px-3 py-2 border rounded focus:outline-none"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none"
      >
        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none"
      >
        {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition md:col-span-2"
      >
        {selectedTask ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;