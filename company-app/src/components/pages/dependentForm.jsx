import LoadingSpinner from '../elements/loading';
import FormLayout from '../templates/FormLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { failedSwal, successSwal, } from '../../helper';
import EmployeeService from '../../services/employeeService';
import DependentService from '../../services/dependentService';
import DependentForm from '../modules/dependentForm';

function DependentFormPage({ setEmployees, setErrors,employees, errors, setEditingDependent, editingDependent }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [shouldNavigate, setShouldNavigate]=useState();

    const addDependent = async (dependent) => {
        try {
            const listErrors = {}
            if (Object.keys(listErrors).length === 0) {
                dependent.employeeId = parseInt(dependent.employeeId);
                await DependentService.create(dependent);
                successSwal('Dependent Added successfully');
            }
            return listErrors;

        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    const updateDependent = async (dependent) => {
        try {
            const listErrors = {}
            setErrors(listErrors);
            console.log(dependent)

            if (Object.keys(listErrors).length === 0) {
                dependent.employeeId = parseInt(dependent.employeeId);
                await DependentService.update(id,dependent)
                successSwal('Employee Edited successfully');
                setEditingDependent(null);
            }
            return listErrors;

        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data;
        }

    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await EmployeeService.getAll();
                setEmployees(EmployeeResponse.data.data);
                if (!id) {
                    setLoading(false);
                    return;
                }
                const dependentResponse = await DependentService.get(id);
                setEditingDependent(dependentResponse.data);
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
    }, [id, setEmployees, setEditingDependent, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            navigate('/dependents');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <FormLayout title={editingDependent ? "Form to Update Dependent" : "Form to Add Dependent"}>
            <DependentForm
                employees={employees}
                addDependent={addDependent}
                updateDependent={updateDependent}
                editingDependent={editingDependent}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default DependentFormPage;