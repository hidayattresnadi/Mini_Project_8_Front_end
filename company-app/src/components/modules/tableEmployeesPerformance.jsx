import Container from '../elements/container';
import TableEmployeesPerformanceRow from '../widgets/tableEmployeesPerformanceRow';
import TableHeader from '../widgets/tableHeader';


const TableEmployeesPerformance = ({ employeesPerformance, columns }) => {
    
    return (
        <div style={{ height: '450px', padding:0 }} className='card mt-5 bg-white'>
            <Container className="container-fluid card-header text-start">
                    <h2 className="mb-0">Top 5 Employees by Performance</h2>
            </Container>
            <Container className={'mt-3'}>
            <table className="table text-start mt-4">
                <TableHeader className={'table'} columns={columns} />
                <tbody>
                    {employeesPerformance.map((employeePerformance, index) => (
                        <TableEmployeesPerformanceRow
                            key={index}
                            employeePerformance={employeePerformance}
                        />
                    ))}
                </tbody>
            </table>

            </Container>
            
        </div>

    )

};

export default TableEmployeesPerformance;
