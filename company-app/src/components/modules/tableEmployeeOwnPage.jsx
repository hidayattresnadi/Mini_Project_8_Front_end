import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableEmployeeOwnRow from '../widgets/tableEmployeeOwnPageRow';


const TableEmployeesOwn = ({ employees, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {employees.map((employee) => (
                        <TableEmployeeOwnRow
                            key={employee.empNo}
                            employee={employee}
                            onDetail={() => {
                                navigate(`/employees/detail/${employee.empNo}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableEmployeesOwn;
