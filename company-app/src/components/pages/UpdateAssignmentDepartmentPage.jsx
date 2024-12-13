import { useNavigate } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import WorksOnService from '../../services/worksOns';
import { useSelector } from 'react-redux';
import TableWorksOnsDepartment from '../modules/tableAssignmentDepartment';

function AssignmentDepartmentPage( {worksOns, setWorksOns, refresh }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add WorksOn';
    const onClick = ()=>navigate('/assignments/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const { user: currentUser } = useSelector(state => state.auth);
    const columnsTableWorksOns = ["Id", "Employee Name", "Project Name", "Hours Worked", "Edit"];

    let isSupervisor = currentUser?.roles.includes('Employee Supervisor')

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await WorksOnService.getAll();
                setWorksOns(response.data);
            } catch (error) {
                setErrorStatus(true);
                console.log("Error:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        myFetch();
    }, [refresh]);

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading workOns</p>;

    return (
        <>
        <TableLayout title="List of WorksOns" buttonTitle={isSupervisor ? buttonTitle : ''} onClick={isSupervisor ? onClick :''} >
            <TableWorksOnsDepartment columns={columnsTableWorksOns} worksOns={worksOns} />
        </TableLayout>
        </>
    )
}

export default AssignmentDepartmentPage;