import TableCell from '../elements/tableCell';

const TableDepartmentPublicRow = ({ department }) => (
    <tr>
        <TableCell>{department.departmentID}</TableCell>
        <TableCell>{department.departmentName}</TableCell>
        <TableCell>{department ? `${department?.managerName}`: 'Not Available'}</TableCell>
        <TableCell>{department.locationNames?.map(loc => loc).join(', ')}</TableCell>
    </tr>
);

export default TableDepartmentPublicRow;