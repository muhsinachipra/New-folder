// client\src\components\TaskStats.jsx

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF6347', '#4682B4'];

const TaskStats = ({ stats }) => {
    const data = [
        { name: 'Total Tasks', value: stats.totalTasks },
        { name: 'Completed Tasks', value: stats.completedTasks },
        { name: 'Overdue Tasks', value: stats.overdueTasks },
        { name: 'High Priority Tasks', value: stats.highPriorityTasks },
        { name: 'Medium Priority Tasks', value: stats.mediumPriorityTasks },
        { name: 'Low Priority Tasks', value: stats.lowPriorityTasks },
    ];

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                {data.map((item, index) => (
                    <div key={item.name} className="bg-white rounded-lg shadow-sm p-3">
                        <h3 className="text-lg font-semibold" style={{ color: COLORS[index] }}>{item.value}</h3>
                        <p className="text-gray-600">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

TaskStats.propTypes = {
    stats: PropTypes.shape({
        totalTasks: PropTypes.number.isRequired,
        completedTasks: PropTypes.number.isRequired,
        overdueTasks: PropTypes.number.isRequired,
        highPriorityTasks: PropTypes.number.isRequired,
        mediumPriorityTasks: PropTypes.number.isRequired,
        lowPriorityTasks: PropTypes.number.isRequired,
    }).isRequired,
};

export default TaskStats;
