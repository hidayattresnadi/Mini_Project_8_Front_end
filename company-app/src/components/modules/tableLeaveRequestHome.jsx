import TableHeader from '../widgets/tableHeader';
import TableLeaveRequestHomeRow from '../widgets/tableLeaveRequestHomeRow';
import { useNavigate } from 'react-router-dom';

const TableLeaveRequestsHome = ({ leaveRequests, columns}) => {
    const navigate = useNavigate();
    return (
        <>
            <table key={leaveRequests.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {leaveRequests.map((leaveRequest) => (
                        <TableLeaveRequestHomeRow
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

export default TableLeaveRequestsHome;
