import DetailLayout from '../templates/detailLayout';
import DepartmentDetailCard from '../modules/departmentCard';
import EmployeesPage from './employeesPage';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import DepartmentService from '../../services/departmentService';
import EmployeeService from '../../services/employeeService';
import { useSelector } from 'react-redux';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';

function DepartmentOwnDetailPage({ setEmployees, employees, columnsTableEmployees, refresh, setRefresh }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState();
    const [departmentName, setDepartmentName] = useState();
    const { user: currentUser } = useSelector(state => state.auth);
    const [deptId, setDeptId] = useState();
    const navigate= useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const employeeResponse = await EmployeeService.get(currentUser.user.employeeId);
                setDeptId(employeeResponse.data.departmentId);

                const DepartmentResponse = await DepartmentService.get(employeeResponse.data.departmentId);
                setDepartmentData(DepartmentResponse.data);
                setDepartmentName(DepartmentResponse.data.name);
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
    }, [setDepartmentData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            <DetailLayout title={'Department Details'}>
                <DepartmentDetailCard detailDepartment={departmentData} />
                <Button onClick={()=> navigate(`/departments/${deptId}`)} className={'btn btn-primary'}>Update Department Information</Button>
            </DetailLayout>
            <EmployeesPage
                employees={employees}
                setEmployees={setEmployees}
                columns={columnsTableEmployees}
                refresh={refresh}
                setRefresh={setRefresh}
                departmentName ={departmentName}
            />
        </>
    )
}

export default DepartmentOwnDetailPage;