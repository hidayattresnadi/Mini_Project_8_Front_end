import ProjectDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const ProjectDetailCard = ({ detailProject}) => {
    return (
        <>
            <Container className="book-details">
                <ProjectDetail label="Id" value={detailProject.projectId} />
                <ProjectDetail label="Project Name" value={detailProject.name} />
                <ProjectDetail label="Department" value={detailProject.departmentName} />
                <ProjectDetail label="Location" value={detailProject.locationName} />
            </Container>
        </>

    );
};

export default ProjectDetailCard;
