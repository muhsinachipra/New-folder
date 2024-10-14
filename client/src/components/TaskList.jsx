import { useState, useEffect } from 'react';
import { updateTask, deleteTask, searchTasks } from '../api';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks, onEdit, onAddTask }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(() => {
        const filterTasks = async () => {
            if (searchQuery) {
                const result = await searchTasks(searchQuery);
                setFilteredTasks(result.data);
            } else {
                setFilteredTasks(tasks);
            }
        };
        filterTasks();
    }, [searchQuery, tasks]);

    const handleDelete = async (id) => {
        await deleteTask(id);
    };

    const handleToggleComplete = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(task._id, updatedTask);
    };

    return (
        <div>
            <div className="flex items-center mb-4 space-x-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={onAddTask}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow transition duration-300 ease-in-out flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Task
                </button>
            </div>
            <ul className="space-y-4">
                {filteredTasks.map((task) => (
                    <li key={task._id} className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out hover:shadow-lg">
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <h3
                                    onClick={() => handleToggleComplete(task)}
                                    className={`text-xl font-semibold cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                                >
                                    {task.title}
                                </h3>
                                <p className="text-gray-600 mt-1">{task.description}</p>
                                <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleToggleComplete(task)} className={`p-2 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                    <FontAwesomeIcon icon={task.completed ? faCheck : faTimes} />
                                </button>
                                <button onClick={() => onEdit(task)} className="p-2 rounded-full bg-blue-100 text-blue-600">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(task._id)} className="p-2 rounded-full bg-red-100 text-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
};

export default TaskList;