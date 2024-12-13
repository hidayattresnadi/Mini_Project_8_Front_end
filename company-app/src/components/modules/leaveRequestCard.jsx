import MemberDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";
import { formatDateWithOrdinal, successSwal } from "../../helper";
import {  useEffect, useState } from "react";
import ProcessService from "../../services/processService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../elements/loading";

const LeaveRequestDetailCard = ({ detailLeaveRequest }) => {
    const { user: currentUser } = useSelector(state => state.auth);
    const [comment, setComment] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate= useNavigate();

    const handleSubmit = async () => {
        if (!comment || !requestStatus) {
            toast.error("Both comments and status must be filled out!");
            return;
        }

        try {
            const payload = { comment, requestStatus };
            Swal.fire({
                title: `Are you sure the status is ${requestStatus} ?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    successSwal("Request updated successfully!");
                    setLoading(true);
                     // Set loading to true before the request starts
                    await ProcessService.create(payload, detailLeaveRequest.processId);
                    // Delay to simulate a loading state, and then navigate
                    setTimeout(() => {
                        setShouldNavigate(true); // This triggers navigation after 2 seconds
                    }, 2000);
                }
            });
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to update request.");
        }
    };

    useEffect(() => {
        console.log(detailLeaveRequest)
        if (shouldNavigate) {
            navigate('/leaveRequests');
            setLoading(false); // Set loading to false when navigation occurs
        }
    }, [shouldNavigate]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <Container className="card w-75 container-fluid text-start">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
                {/* Book Request Details */}
                <Container className="mb-4">
                    <h4 className="mb-3">Requester Details</h4>
                    <div className="row">
                        <div className="col-6">
                            <MemberDetail label="Requester" value={detailLeaveRequest.employeeName} />
                            <MemberDetail label="Request Date" value={formatDateWithOrdinal(detailLeaveRequest.requestDate)} />
                        </div>
                        <div className="col-6">
                            <MemberDetail label="Process Id" value={detailLeaveRequest.processId} />
                            <MemberDetail label="Current Status" value={detailLeaveRequest.currentStatus} />
                        </div>
                    </div>
                </Container>

                {/* Book Details */}
                <Container className="mb-4">
                    <h4 className="mb-3">Leave Request Details</h4>
                    <div className="row">
                        <div className="col-4">
                            <MemberDetail label="Leave Type" value={detailLeaveRequest.leaveType} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="Start Date" value={detailLeaveRequest.startDate} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="End Date" value={detailLeaveRequest.endDate} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="Total Days" value={detailLeaveRequest.totalDays} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="Reason" value={detailLeaveRequest.reason} />
                        </div>
                    </div>
                </Container>

                {/* Request History */}
                <Container>
                    <h4 className="mb-3">Request History</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Review Date</th>
                                <th>Action By</th>
                                <th>Action</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailLeaveRequest.requestHistory.map((history, index) => (
                                <tr key={index}>
                                    <td>{formatDateWithOrdinal(history.actionDate)}</td>
                                    <td>{history.actionBy}</td>
                                    <td>{history.action}</td>
                                    <td>{history.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
                {currentUser.roles.includes(detailLeaveRequest.requiredRole.name) ?
                    <Container>
                        <h4 className="mb-3">Add Comments and Update Status</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="comments" className="form-label">Comments</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comments"
                                    placeholder="Enter your comments"
                                    onChange={(e) => setComment(e.target.value)} // Replace with state handler
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Request Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    onChange={(e) => setRequestStatus(e.target.value)} // Replace with state handler
                                >
                                    <option value="">Select Status</option>
                                    <option value="Request Approved">Approved</option>
                                    <option value="Request Rejected">Rejected</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit} // Replace with your submission handler
                            >
                                Submit
                            </button>
                        </form>
                    </Container> : ''
                }
            </Container>

        </>

    );
};

export default LeaveRequestDetailCard;
