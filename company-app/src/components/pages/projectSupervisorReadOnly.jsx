import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableProjects from '../modules/tableProjects';
import ProjectService from '../../services/projectService';

function ProjectsSupervisorPage( projects, setProjects, refresh, setRefresh }) {
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await ProjectService.getAll();
                setProjects(response.data);
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
    if (errorStatus) return <p>Error loading projects</p>;

    return (
        <>
        <TableLayout title="List of Projects" >
            <TableProjects columns={columns} projects={projects} />
        </TableLayout>
        </>
    )
}

export default ProjectsSupervisorPage;