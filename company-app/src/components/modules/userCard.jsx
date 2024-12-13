import WorksOnDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const UserDetailCard = ({ user }) => {
    return (
        <>
            <Container className="book-details">
                <WorksOnDetail label="Id" value={user.userId} />
                <WorksOnDetail label="User Name" value={user.userName} />
                <WorksOnDetail label="Email" value={user.email } />
                <WorksOnDetail label="Roles" value={user.roles} />
            </Container>
        </>

    );
};

export default UserDetailCard;
