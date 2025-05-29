import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
    tasks,
    editingId,
    editTask,
    onEditChange,
    onEditSave,
    onEditCancel,
    onEditStart,
    onDelete,
    deletingId,
}) {
    if (tasks.length === 0) {
        return <div className="text-gray-500 text-center py-8">No tasks found.</div>;
    }

    return (
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead>
                <tr className="bg-blue-50">
                    <th className="py-2 px-3 text-left font-semibold">Title</th>
                    <th className="py-2 px-3 text-left font-semibold">Description</th>
                    <th className="py-2 px-3 text-left font-semibold">Due Date</th>
                    <th className="py-2 px-3 text-left font-semibold">Status</th>
                    <th className="py-2 px-3 text-left font-semibold">Priority</th>
                    <th className="py-2 px-3 text-center font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task =>
                    task && task.id != null ? (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isEditing={editingId === task.id}
                            editTask={editTask}
                            onEditChange={onEditChange}
                            onEditSave={() => onEditSave(task.id)}
                            onEditCancel={onEditCancel}
                            onEditStart={() => onEditStart(task)}
                            onDelete={() => onDelete(task.id)}
                            deleting={deletingId === task.id}
                        />
                    ) : null
                )}
            </tbody>
        </table>
    );
}

export default TaskList;