import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import DepartmentService from '../../services/departmentService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';
import TableDepartmentsPublic from '../modules/tableDepartmentPublic';

function DepartmentsPublicPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const columnsTableDepartments = ["Id", "Department Name", "Manager Name","Location"];

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const fetchDepartments = async ({ page, pageSize }) => {
        try {
            const queryParams = {
                pageNumber: page,
                pageSize: pageSize,
            };

            let response = await DepartmentService.getAll(queryParams);
            return response.data;

        } catch (error) {
            throw new Error(error, 'Error fetching employees');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['departments', page, pageSize],
        queryFn: () => fetchDepartments({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading departments</p>;

    return (
        <>
            <TableLayout title="List of Departments" >
                <div className='mb-3 d-flex'>
                <Label className='me-3'>Select Total Items: </Label>
                <select className='form-control' style={{width:'100px'}} onChange={handleSizePage}>
                    <SelectOption value="5">5</SelectOption>
                    <SelectOption value="10">10</SelectOption>
                    <SelectOption value="15">15</SelectOption>
                </select>

                </div>
                
                <TableDepartmentsPublic columns={columnsTableDepartments} departments={data?.data} />
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"page-item"}
                    pageCount={data?.totalPages || 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center" // Bootstrap pagination container
                    activeClassName="active" // Bootstrap active class
                    pageClassName="page-item" // Bootstrap page item class
                    pageLinkClassName="page-link" // Bootstrap page link class
                    previousClassName="page-item" // Bootstrap previous button class
                    previousLinkClassName="page-link" // Bootstrap previous link class
                    nextClassName="page-item" // Bootstrap next button class
                    nextLinkClassName="page-link" // Bootstrap next link class
                />
            </TableLayout>
        </>
    )
}

export default DepartmentsPublicPage;