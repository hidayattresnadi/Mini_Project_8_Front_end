import TableCell from '../elements/tableCell';

const TableProjectPublicRow = ({ project}) => (
    <tr>
        <TableCell>{project.projectId}</TableCell>
        <TableCell>{project.name}</TableCell>
        <TableCell>{project.departmentName}</TableCell>
    </tr>
);

export default TableProjectPublicRow;