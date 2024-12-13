import TableLayout from '../templates/TableLayout';
import LoadingSpinner from '../elements/loading';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DependentService from '../../services/dependentService';
import TableDependents from '../modules/tableDependents';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../helper';
import Swal from 'sweetalert2';

function DependentsPage({ columns = { columns } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Dependent';
    const onClick = () => navigate('/dependents/new')

    const fetchDependents = async () => {
        try {

            let response = await DependentService.getAll();
            return response.data;

        } catch (error) {
            throw new Error(error, 'Error fetching employees');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['dependents'],
        queryFn: () => fetchDependents(),
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    const deleteDependentMutation = useMutation({
        mutationFn: (id) => DependentService.remove(id),
        onSuccess: () => {
            successSwal('Dependent Deleted successfully');
            queryClient.invalidateQueries(['dependents']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete dependent', 'error');
        },
    });


    const handleDeleteDependent = (id) => {
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
                deleteDependentMutation.mutate(id); // Gunakan mutasi delete
            }
        });
    };



    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading departments</p>;

    return (
        <>
            <TableLayout title="List of Dependents" buttonTitle={buttonTitle} onClick={onClick} >
                <TableDependents columns={columns} dependents={data} onDelete={handleDeleteDependent} />
            </TableLayout>
        </>
    )
}

export default DependentsPage;