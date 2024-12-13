import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import WorksOnService from '../../services/worksOns';
import TableAssignmentsPublic from '../modules/tableAssignmentPublic';

function AssignmentPublicPage({worksOns, setWorksOns, refresh, }) {
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const columnsTableWorksOns = ["Id", "Employee Name", "Project Name", "Hours Worked"];

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
        <TableLayout title="List of WorksOns" >
            <TableAssignmentsPublic columns={columnsTableWorksOns} worksOns={worksOns}  />
        </TableLayout>
        </>
    )
}

export default AssignmentPublicPage;