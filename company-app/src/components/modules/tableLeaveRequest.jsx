import TableHeader from '../widgets/tableHeader';
import TableLeaveRequestRow from '../widgets/tableLeaveRequestRow';
import { useNavigate } from 'react-router-dom';

const TableLeaveRequests = ({ leaveRequests, columns}) => {
    const navigate = useNavigate();
    return (
        <>
            <table key={leaveRequests.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {leaveRequests.map((leaveRequest) => (
                        <TableLeaveRequestRow
                            key={leaveRequest.processId}
                            leaveRequest={leaveRequest}
                            onDetail={()=>navigate(`/leaveRequest/detail/${leaveRequest.processId}`)}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableLeaveRequests;
