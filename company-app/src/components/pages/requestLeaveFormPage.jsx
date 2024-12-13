import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateLeaveRequest} from '../../helper';
import LeaveRequestService from '../../services/leaveRequestService';
import RequestLeaveForm from '../modules/requestLeaveForm';

function RequestLeaveFormPage({ setErrors, errors }) {

    const addLeaveRequest = async (leaveRequest) => {
        try {
            const listErrors = validateLeaveRequest(leaveRequest);
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                const result = await LeaveRequestService.addLeaveRequest(leaveRequest)
                if (result) {
                    successSwal('Request Leave add successfully');
                }
            }
            return listErrors;

        } catch (error) {
            setErrors(error)
            failedSwal(error.response.data.error)
            return error
        }
    };

    return (
        <FormLayout title={"Add Leave Request"}>
            <RequestLeaveForm
                addLeaveRequest={addLeaveRequest }
                errors={errors}
            />
        </FormLayout>
    )
}

export default RequestLeaveFormPage;