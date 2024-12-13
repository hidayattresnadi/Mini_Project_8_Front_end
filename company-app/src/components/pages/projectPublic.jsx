import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableProjects from '../modules/tableProjects';
import ProjectService from '../../services/projectService';
import TableProjectsPublic from '../modules/tableProjectPublic';

function ProjectsPublicPage({ projects, setProjects, refresh }) {
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const columnsTableProjects = ["Id", "Project Name", "Department"];

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
        <TableLayout title="List of Projects">
            <TableProjectsPublic columns={columnsTableProjects} projects={projects} />
        </TableLayout>
        </>
    )
}

export default ProjectsPublicPage;