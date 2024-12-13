import apiClient from "../axiosConfig.jsx";

const generateProjectReport = async () => {
    return await apiClient.get('/WorksOn/generate_report', {
        responseType: 'blob',
    });
};

const generateEmployeeDepartmentReport = async (departmentId) => {
    return await apiClient.get(`/Employee/generate_report/${departmentId}`, {
        responseType: 'blob',
    });
};

const generateTotalLeavesTakenPeriodReport = async (params) => {
    return await apiClient.get(`/LeaveRequest/generate_report`, {
        responseType: 'blob',
        params: params
    });
};

const ReportService = {
    generateProjectReport,
    generateEmployeeDepartmentReport,
    generateTotalLeavesTakenPeriodReport
};

export default ReportService;  