import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import Container from '../elements/container';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';
import LeaveRequestService from '../../services/leaveRequestService';
import Input from '../elements/input';
import TableLeaveRequests from '../modules/tableLeaveRequest';

function LeaveRequestListsPage() {
    const columns = ["Process Id", "Employee Name", "Start Date", "End Date", "Total Days", "Leave Type", "Reason", "Request Date","File Link","Status", "Detail"]
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const fetchLeaveRequests = async ({ page, pageSize, searchQuery }) => {
        try {
            let response = await LeaveRequestService.getAll({
                pageNumber: page,
                pageSize: pageSize,
                keyWord: searchQuery
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error(error, 'Error fetching leave requests');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['leaveRequests', page, pageSize, searchQuery],
        queryFn: () => fetchLeaveRequests({ page, pageSize, searchQuery }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Container><h1>Error Happens...</h1></Container>;

    return (
        <>
            <TableLayout title="List of Book Requests" >
                <Container className='input-group mb-3' >
                    <span className='input-group-text'>Search</span>
                    <Input label="Search" type="text" placeholder='search by leave type' className='form-control' value={searchQuery} onChange={handleSearch} />
                </Container>
                <Container className='mb-3'>
                    <Label className='me-3'>Select Total Items: </Label>
                    <select onChange={handleSizePage}>
                        <SelectOption value="5">5</SelectOption>
                        <SelectOption value="2">2</SelectOption>
                        <SelectOption value="100">100</SelectOption>
                    </select>
                </Container>
                <TableLeaveRequests columns={columns} leaveRequests={data?.data} />
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

export default LeaveRequestListsPage;