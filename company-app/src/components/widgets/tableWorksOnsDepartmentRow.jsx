import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';

const TableWorksOnDepartmentRow = ({ worksOn, onEdit }) => (
    <tr>
        <TableCell>{worksOn.worksNo}</TableCell>
        <TableCell>{worksOn.empName}</TableCell>
        <TableCell>{worksOn.projName}</TableCell>
        <TableCell>{worksOn.hoursworked}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit WorksOn">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
    </tr>
);

export default TableWorksOnDepartmentRow;