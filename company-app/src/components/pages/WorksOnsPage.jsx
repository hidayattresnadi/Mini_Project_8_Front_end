import { useNavigate } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableWorksOns from '../modules/tableWorksOns';
import Swal from 'sweetalert2';
import WorksOnService from '../../services/worksOns';

function WorksOnsPage({ columns = { columns }, worksOns, setWorksOns, refresh, setRefresh }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add WorksOn';
    const onClick = ()=>navigate('/assignments/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await WorksOnService.getAll();
                setWorksOns(response.data);
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

    const handleDeleteWorksOn = (id) => {
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
                try {
                    await WorksOnService.remove(id);
                    Swal.fire("Deleted!", "WorksOn Deleted successfully", "success");
                    setRefresh(!refresh);
                } catch (error) {
                    console.log("Error deleting worksOn:", error);
                    setErrorStatus(true);
                }
            }
        });
    };

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading workOns</p>;

    return (
        <>
        <TableLayout title="List of WorksOns" buttonTitle={buttonTitle} onClick={onClick} >
            <TableWorksOns columns={columns} worksOns={worksOns} onDelete={handleDeleteWorksOn} />
        </TableLayout>
        </>
    )
}

export default WorksOnsPage;