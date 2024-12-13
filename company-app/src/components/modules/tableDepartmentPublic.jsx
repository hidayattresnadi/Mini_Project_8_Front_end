import TableHeader from '../widgets/tableHeader';
import TableDepartmentPublicRow from '../widgets/tableDepartmentPublic';


const TableDepartmentsPublic = ({ departments, columns }) => {
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {departments.map((department) => (
                        <TableDepartmentPublicRow
                            key={department.deptNo}
                            department={department}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableDepartmentsPublic;
