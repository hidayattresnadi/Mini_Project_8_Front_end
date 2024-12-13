import {
    PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import Container from '../elements/container';

const PieCart = ({ dashboardInfo }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d','red'];

    return (
        <div style={{ height: '450px', padding:0 }} className='card mt-5'>
            <Container className="container-fluid card-header text-start">
                    <h2 className="mb-0">Employee Distribution by Department</h2>
            </Container>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={dashboardInfo.employeeDistributions}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ departmentName, percent }) => `${departmentName} (${(percent * 100).toFixed(0)}%)`}
                        // label={({ x, y, index, percent }) => {
                        //     const entry = dashboardInfo.employeeDistributions[index]; // Ambil data label
                        //     return (
                        //         <text
                        //             x={x}
                        //             y={y}
                        //             textAnchor="middle"
                        //             dominantBaseline="central"
                        //             style={{ fontSize: '12px', fill: '#333' }}
                        //         >
                        //             <tspan x={x} dy="1em" dx="-1em">{entry.departmentName} {(percent * 100).toFixed(0)}%</tspan> {/* Baris pertama */}
                        //         </text>
                        //     );
                        // }}
                        outerRadius={120} 
                        fill="#8884d8" 
                        dataKey="departmentCount"
                    >
                        {dashboardInfo.employeeDistributions.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                     formatter={(value, entry) => {
                        const { departmentCount } = entry.payload; // Mengambil departmentName dari data payload
                        return `${departmentCount} employees`;
                    }} 
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieCart;
