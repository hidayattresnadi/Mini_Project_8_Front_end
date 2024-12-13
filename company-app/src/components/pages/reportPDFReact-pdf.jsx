import { useEffect, useState } from "react";
import TotalLeavesTakenPeriodReport from "../modules/totalLeavesTakenPeriodReport";
import ProjectReport from "../modules/projectReport";
import DepartmentService from "../../services/departmentService";
import EmployeeDepartmentReport from "../modules/employeeDepartmentReport";


const CompanyReportReact = ({ setDepartments, departments }) => {
    const [report, setReport] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const DepartmentResponse = await DepartmentService.getAll();
                setDepartments(DepartmentResponse.data.data);
                return;
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [setDepartments]);

    if (report === "Total Leaves Taken in a Time Period") {
        return (
            <>
                <TotalLeavesTakenPeriodReport setReport={setReport} />
            </>
        )
    } else if (report === "Project Report") {
        return (
            <>
                <ProjectReport setReport={setReport} />
            </>
        );
    }
    else if (report === "List of Employees per Department") {
        return (
            <>
                <EmployeeDepartmentReport departments={departments} setReport={setReport} />
            </>
        )
    }
    else {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Report List</h4>
                <select className="form-select" value={report} onChange={(e) => setReport(e.target.value)}>
                    <option value={report} disabled>Please Choose Report</option>
                    <option value="Project Report">Project Report</option>
                    <option value="Total Leaves Taken in a Time Period">Total Leaves Taken in a Time Period</option>
                    <option value="List of Employees per Department">List of Employees per Department</option>
                </select>
            </div>
        );
    }
};

export default CompanyReportReact;