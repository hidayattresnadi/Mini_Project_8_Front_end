import { useEffect, useState } from 'react';
import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
import LoadingSpinner from '../elements/loading';
import ProjectService from '../../services/projectService';
import EmployeeService from '../../services/employeeService';
import DepartmentService from '../../services/departmentService';
import DashboardService from '../../services/dashboardService';
import PieCart from '../modules/pieCart';
import BarCart from '../modules/barCart';
import TableEmployeesPerformance from '../modules/tableEmployeesPerformance';
import TableLeaveRequestsHome from '../modules/tableLeaveRequestHome';
function HomePage() {
    const [errorStatus,setErrorStatus] = useState()
    const [Loading, setLoading] = useState(true)
    const [projects,setProjects] = useState()
    const [employees, setEmployees] = useState()
    const [departements, setDepartments] = useState()
    const [dashboardInfo,setDashboardInfo] = useState();
    const columnsTableEmployeesPerformance = ["Employee Name", "Total Hours"];
    const columns = ["Process Id","Employee Name","Start Date","End Date", "Total Days", "Leave Type", "Reasons","Request Date", "Status","Detail"]

    useEffect(() => {
        const myFetch = async () => {
            try {
                const projectResponse = await ProjectService.getAll();
                setProjects(projectResponse.data);

                const employeeResponse = await EmployeeService.getAll();
                setEmployees(employeeResponse.data.data);

                const departmentResponse = await DepartmentService.getAll();
                setDepartments(departmentResponse.data.data);

                let dashboardResponse = await DashboardService.getAll();
                console.log(dashboardResponse.data)
                setDashboardInfo(dashboardResponse.data)

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
    }, []);

    if (Loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading home</p>;

    return (
        <>
        <Container className='dashboard-container'>
        <h1 className='text-center'>Company Dashboard</h1>
        <Container className='dashboard-grid'>
            <Container className='card'>
                <Icon className='fas fa-users fa-2x'></Icon>
                <h2>Total Employees</h2>
                <Text>{employees.length}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Departments</h2>
                <Text>{departements.length}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Projects</h2>
                <Text>{projects.length}</Text>
            </Container>
        </Container>

        <Container className={"container-fluid row"}>
                            <Container className="col-4">
                                <BarCart dashboardInfo={dashboardInfo} />
                            </Container>

                            <Container className={"col-5"}>
                                <PieCart dashboardInfo={dashboardInfo} />
                            </Container>

                            <Container className={"col-3 table-responsive"}>
                                <TableEmployeesPerformance columns={columnsTableEmployeesPerformance} employeesPerformance={dashboardInfo.mostProductiveEmployees} />
                            </Container>

                            <Container className="table-responsive mt-5 card" style={{ padding: 0 }}>
                                <Container className="container-fluid card-header text-start mb-4">
                                    <h4 className="mb-0">Follow Up Tasks By Users</h4>
                                </Container>
                                <h1 className="text-start mt-3 mb-4 ms-3">Leave Request List</h1>
                                <TableLeaveRequestsHome columns={columns} leaveRequests={dashboardInfo.processFollowUp} />
                            </Container>
                        </Container>
    </Container>
    </>
    )
}

export default HomePage;