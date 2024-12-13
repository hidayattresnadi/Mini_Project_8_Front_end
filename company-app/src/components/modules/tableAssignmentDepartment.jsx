import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableWorksOnDepartmentRow from '../widgets/tableWorksOnsDepartmentRow';


const TableWorksOnsDepartment = ({ worksOns, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {worksOns.map((worksOn) => (
                        <TableWorksOnDepartmentRow
                            key={worksOn.workNo}
                            worksOn={worksOn}
                            onEdit={() => {
                                navigate(`/assignments/${worksOn.worksNo}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableWorksOnsDepartment;
