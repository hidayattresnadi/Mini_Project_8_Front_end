import TableLayout from '../templates/TableLayout';
import LoadingSpinner from '../elements/loading';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userService from '../../services/userService';
import { successSwal } from '../../helper';
import Swal from 'sweetalert2';
import TableUsers from '../modules/tableUsers';
import { useNavigate } from 'react-router-dom';

function UsersPage() {
    const columnTableUsers = ["User Id","User Name", "Email","Edit", "Delete", "Detail"]
    const navigate = useNavigate();

    const fetchRoles = async () => {
        try {
            let response = await userService.getAll();
            return response.data;

        } catch (error) {
            throw new Error(error, 'Error fetching users');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchRoles(),
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: (id) => userService.remove(id),
        onSuccess: () => {
            successSwal('User Deleted successfully');
            queryClient.invalidateQueries(['users']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete user', 'error');
        },
    });

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutate(id); // Gunakan mutasi delete
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading roles</p>;

    return (
        <>
            <TableLayout title="List of Users" buttonTitle={"Add New User"} onClick={()=> navigate('/register/user')}>
                <TableUsers columns={columnTableUsers} users={data} onDelete={handleDeleteUser}  />
            </TableLayout>
        </>
    )
}

export default UsersPage;