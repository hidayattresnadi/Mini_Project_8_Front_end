import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableUserRow from '../widgets/tableUserRow';


const TableUsers = ({ users, columns, onDelete }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {users.map((user) => (
                        <TableUserRow
                            key={user.userId}
                            user={user}
                            onEdit={() => {
                                navigate(`/users/${user.userId}`)
                            }}
                            onDelete={() => onDelete(user.userId)}
                            onDetail={() => {
                                navigate(`/users/detail/${user.userId}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableUsers;
