import TableAssignmentRow from '../widgets/tableAssignmentPublic';
import TableHeader from '../widgets/tableHeader';


const TableAssignmentsPublic = ({ worksOns, columns }) => {
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {worksOns.map((worksOn) => (
                        <TableAssignmentRow
                            key={worksOn.workNo}
                            worksOn={worksOn}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableAssignmentsPublic;
