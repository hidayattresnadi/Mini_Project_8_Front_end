import LoadingSpinner from '../elements/loading';
import FormLayout from '../templates/FormLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { failedSwal, successSwal, validateUser } from '../../helper';
import EmployeeService from '../../services/employeeService';
import UserService from '../../services/authService';
import UserForm from '../modules/userForm';

function UserFormPage({ setEmployees, setErrors, employees, errors }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [shouldNavigate, setShouldNavigate] = useState();

    const addUser = async (user) => {
        try {
            const listErrors = validateUser(user)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                user.employeeId = parseInt(user.employeeId)
                await UserService.create(user);
                successSwal('User Added successfully');
            }
            return listErrors;

        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await EmployeeService.getAll();
                setEmployees(EmployeeResponse.data.data);
                setLoading(false);
                return;
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [setEmployees, setErrorStatus]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/employees');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading users</p>;

    return (
        <FormLayout title={"Form to Add User"}>
            <UserForm
                employees={employees}
                addUser={addUser}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default UserFormPage;