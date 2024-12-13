import {BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell}
    from 'recharts';
import Container from '../elements/container';

const BarCart = ({dashboardInfo}) => {

    return (
        <div style={{ height: '450px', padding:0 }} className='card mt-5'>
            <Container className="container-fluid card-header text-start">
                    <h2 className="mb-0">Average Salary by Department</h2>
            </Container>

            <ResponsiveContainer className={"mt-4 ms-4"} width="90%" height="80%">

                <BarChart data={dashboardInfo.departmentSallaries} layout="horizontal">

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="departmentName" type="category" width={100} />

                    <YAxis type='number' width={100}  />

                    <Tooltip />

                    <Bar dataKey="departmentSallary" fill="#0d6efd" />

                </BarChart>

            </ResponsiveContainer>
        </div>


    );
};

export default BarCart;