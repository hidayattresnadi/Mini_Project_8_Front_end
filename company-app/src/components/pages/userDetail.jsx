import { useParams } from 'react-router-dom';
import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import userService from '../../services/userService';
import RoleForm from '../modules/roleFormPage';
import UserDetailCard from '../modules/userCard';

function UserDetailPage() {
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData,setUserData] = useState();
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const userResponse = await userService.getUser(userId)
                setUserData(userResponse.data);
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
    }, [userId, setUserData]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }
    return (
        <>
        <DetailLayout title={'User Details'}>
            <UserDetailCard
            user={userData}
        />
        </DetailLayout>

        <RoleForm/>
        </>
       
    )
}

export default UserDetailPage;