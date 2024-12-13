import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';
import { formatDateWithOrdinal } from '../../helper';

const TableEmployeeOwnRow = ({ employee,  onDetail }) => (
    <tr>
        <TableCell>{employee.employeeName}</TableCell>
        <TableCell>{employee.department}</TableCell>
        <TableCell>{employee.jobPosition}</TableCell>
        <TableCell>{employee.level}</TableCell>
        <TableCell>{employee.employmentType}</TableCell>
        <TableCell>{formatDateWithOrdinal(employee.lastUpdatedDate)}</TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Employee">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableEmployeeOwnRow;