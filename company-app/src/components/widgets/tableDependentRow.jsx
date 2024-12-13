import Button from '../elements/button';
import Icon from '../elements/icon';
import TableCell from '../elements/tableCell';

const TableDependentRow = ({ dependent, onEdit, onDelete, onDetail }) => (
    <tr>
        <TableCell>{dependent.dependentId}</TableCell>
        <TableCell>{dependent.name}</TableCell>
        <TableCell>{dependent.relations}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit Employee">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete Employee">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Employee">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableDependentRow;