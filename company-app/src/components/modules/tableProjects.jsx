import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableProjectRow from '../widgets/tableProjectRow';


const TableProjects = ({ projects, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {projects.map((project) => (
                        <TableProjectRow
                            key={project.projectId}
                            project={project}
                            onEdit={() => {
                                navigate(`/projects/${project.projectId}`)
                            }}
                            onDelete={() => onDelete(project.projectId)}
                            onDetail={() => {
                                navigate(`/projects/detail/${project.projectId}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableProjects;
