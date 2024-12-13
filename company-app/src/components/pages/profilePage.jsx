import EmployeeDetailCard from '../modules/employeeCard';
import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import EmployeeService from '../../services/employeeService';
import { useSelector } from 'react-redux';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const navigate = useNavigate();
    const { user: currentUser } = useSelector(state => state.auth);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await EmployeeService.get(currentUser.user.employeeId);
                setEmployeeData(EmployeeResponse.data);
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
            <DetailLayout title="Employee Details">
                <EmployeeDetailCard detailEmployee={employeeData} />
                <Button onClick={()=> navigate(`/employees/${currentUser.user.employeeId}`)} className={'btn btn-primary mt-5'}>Update Your own Profile</Button>
            </DetailLayout>
        </>
    )
}

export default ProfilePage;