import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';

const TableWorksOnRow = ({ worksOn, onEdit, onDelete, onDetail }) => (
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
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete WorksOn">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail WorksOn">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableWorksOnRow;