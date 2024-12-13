import WorksOnDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const WorksOnDetailCard = ({ detailWorksOn }) => {
    return (
        <>
            <Container className="book-details">
                <WorksOnDetail label="Id" value={detailWorksOn.worksNo} />
                <WorksOnDetail label="Department Number" value={detailWorksOn.deptNo} />
                <WorksOnDetail label="Project Name" value={detailWorksOn.projName} />
                <WorksOnDetail label="Supervisor Name" value={detailWorksOn.superVisorName} />
                <WorksOnDetail label="Employee Name" value={detailWorksOn.empName } />
                <WorksOnDetail label="Hours Worked" value={detailWorksOn.hoursworked} />
            </Container>
        </>

    );
};

export default WorksOnDetailCard;
