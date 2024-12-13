import TableHeader from '../widgets/tableHeader';
import TableRoleRow from '../widgets/tableRoleRow';


const TableRoles = ({ roles,  columns }) => {
    
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {roles.map((role) => (
                        <TableRoleRow
                            key={role.id}
                            role={role}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableRoles;
