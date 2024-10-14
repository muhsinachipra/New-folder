// client/src/components/TaskForm.jsx

import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';
import PropTypes from 'prop-types';

const TaskForm = ({ selectedTask, onSave }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
    });

    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask);
        } else {
            setTask({ title: '', description: '', priority: 'Medium' });
        }
    }, [selectedTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task._id) {
            await updateTask(task._id, task);
        } else {
            await createTask(task);
        }
        onSave();
        setTask({ title: '', description: '', priority: 'Medium' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    id="description"
                    placeholder="Task Description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                    id="priority"
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
                {task._id ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

TaskForm.propTypes = {
    selectedTask: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        priority: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};

export default TaskForm;
