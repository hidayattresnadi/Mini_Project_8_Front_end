import TableHeader from '../widgets/tableHeader';
import TableProjectPublicRow from '../widgets/tableProjectPublicRow';


const TableProjectsPublic = ({ projects, columns }) => {
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {projects.map((project) => (
                        <TableProjectPublicRow
                            key={project.projectId}
                            project={project}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableProjectsPublic;
