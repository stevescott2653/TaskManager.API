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
        return <div className="text-gray-500">No tasks found.</div>;
    }

    return (
        <ul className="space-y-2">
            {tasks.map(task => (
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
            ))}
        </ul>
    );
}

export default TaskList;