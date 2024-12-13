import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import { useParams } from 'react-router-dom';
import LeaveRequestService from '../../services/leaveRequestService';
import LeaveRequestDetailCard from '../modules/leaveRequestCard';

function RequestLeaveDetailPage() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [leaveRequestData, setLeaveRequestData] = useState();
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const bookRequestResponse = await LeaveRequestService.get(id);
                setLeaveRequestData(bookRequestResponse.data);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <LeaveRequestDetailCard detailLeaveRequest={leaveRequestData} />
        </>
    )
}

export default RequestLeaveDetailPage;