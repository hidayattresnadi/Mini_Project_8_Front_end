import TableLayout from '../templates/TableLayout';
import LoadingSpinner from '../elements/loading';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import RoleService from '../../services/rolesService';
import TableRoles from '../modules/tableRoles';

function RolesPage() {
    const columnTableRoles = ["Id","Name"]

    const fetchRoles = async () => {
        try {

            let response = await RoleService.getAll();
            return response.data;

        } catch (error) {
            throw new Error(error, 'Error fetching roles');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['roles'],
        queryFn: () => fetchRoles(),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading roles</p>;

    return (
        <>
            <TableLayout title="List of Roles" >
                <TableRoles columns={columnTableRoles} roles={data} />
            </TableLayout>
        </>
    )
}

export default RolesPage;