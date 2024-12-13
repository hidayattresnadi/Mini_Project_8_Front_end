import TableCell from '../elements/tableCell';

const TableEmployeesPerformanceRow = ({ employeePerformance}) => (
    <tr>
        <TableCell>{employeePerformance.employeeName}</TableCell>
        <TableCell>{employeePerformance.totalHours}</TableCell>
    </tr>
);

export default TableEmployeesPerformanceRow;