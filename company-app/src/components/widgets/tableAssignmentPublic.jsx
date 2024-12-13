import TableCell from '../elements/tableCell';

const TableAssignmentRow = ({ worksOn }) => (
    <tr>
        <TableCell>{worksOn.worksNo}</TableCell>
        <TableCell>{worksOn.empName}</TableCell>
        <TableCell>{worksOn.projName}</TableCell>
        <TableCell>{worksOn.hoursworked}</TableCell>
    </tr>
);

export default TableAssignmentRow;