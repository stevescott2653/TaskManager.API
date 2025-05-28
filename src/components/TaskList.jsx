import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({
    tasks,
    onEditStart,
    onEditChange,
    onEditSave,
    onEditCancel,
    onDelete,
    editingTaskId,
    editTask,
    deletingId
}) {
    return (
        <ul className="space-y-2">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isEditing={editingTaskId === task.id}
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