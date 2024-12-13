import TableCell from '../elements/tableCell';

const TableRoleRow = ({ role }) => (
    <tr>
        <TableCell>{role.id}</TableCell>
        <TableCell>{role.name}</TableCell>
    </tr>
);

export default TableRoleRow;