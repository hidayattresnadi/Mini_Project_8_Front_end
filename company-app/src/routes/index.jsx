import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import EmployeesPage from "../components/pages/employeesPage";
import EmployeeFormPage from "../components/pages/employeeFormPage";
import EmployeeDetailPage from "../components/pages/employeeDetailPage";
import DepartmentsPage from "../components/pages/departmentsPage";
import DepartmentFormPage from "../components/pages/departmentFormPage";
import DepartmentDetailPage from "../components/pages/departmentDetailPage";
import ProjectsPage from "../components/pages/projectsPage";
import ProjectFormPage from "../components/pages/projectFormPage";
import ProjectDetailPage from "../components/pages/projectDetailPage";
import WorksOnsPage from "../components/pages/WorksOnsPage";
import WorksOnFormPage from "../components/pages/worksOnFormPage";
import WorksOnDetailPage from "../components/pages/worksOnDetailPage";
import EmployeeFormPageEdit from "../components/pages/employeeFormPageEdit";
import DeactivateEmployeeFormPage from "../components/pages/deactivateEmployeeFormPage";
import DependentsPage from "../components/pages/dependentsPage";
import UserFormPage from "../components/pages/registerUser";
import LoginFormPage from "../components/pages/loginPage";
import PrivateRoute from "../privateRoute";
import RolesPage from "../components/pages/rolesPage";
import UnauthorizedPage from "../components/modules/unauthorized";
import UsersPage from "../components/pages/usersPage";
import UserDetailPage from "../components/pages/userDetail";
import ProfilePage from "../components/pages/profilePage";
import DepartmentsPublicPage from "../components/pages/departmentPublic";
import ProjectsPublicPage from "../components/pages/projectPublic";
import AssignmentPublicPage from "../components/pages/assignmentPublic";
import DepartmentOwnDetailPage from "../components/pages/pageManageDepartmentOwn";
import EmployeesOwnPage from "../components/pages/EmployeeOwnPage";
import AssignmentDepartmentPage from "../components/pages/UpdateAssignmentDepartmentPage";
import DependentFormPage from "../components/pages/dependentForm";
import LeaveRequestListsPage from "../components/pages/leaveRequestListsPage";
import RequestLeaveDetailPage from "../components/pages/reviewLeaveRequestFormDetail";
import RequestLeaveFormPage from "../components/pages/requestLeaveFormPage";
import CompanyReportReact from "../components/pages/reportPDFReact-pdf";

const columnsTableEmployees = ["Employee Name", "Department", "Job Position", "Level","Employment Type","Last Updated", "Edit", "Delete", "Detail"];
const columnsTableDepartments = ["Id", "Department Name", "Manager Name","Location", "Edit", "Delete", "Detail"];
const columnsTableProjects = ["Id", "Project Name", "Department", "Edit", "Delete", "Detail"];
const columnsTableWorksOns = ["Id", "Employee Name", "Project Name", "Hours Worked", "Edit", "Delete", "Detail"];
const columnTableDependents = ["Id","Name","Relations","Edit","Delete","Detail"]
const AppRouter = () => {

    const [employees, setEmployees] = useState();
    const [departments, setDepartments] = useState();
    const [projects, setProjects] = useState();
    const [worksOns, setWorksOns] = useState();
    const [refresh, setRefresh] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingWorksOn, setEditingWorksOn] = useState(null);
    const [editingDependent, setEditingDependent] = useState(null);
    const [errors, setErrors] = useState(null);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout
                setEditingEmployee={setEditingEmployee}
                setEditingDepartment={setEditingDepartment}
                setEditingProject={setEditingProject}
                setEditingWorksOn={setEditingWorksOn}
                setErrors={setErrors}
            />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage/>
                    )
                },
                {   
                    // {/* Route Khusus Administrator */}
                    element: <PrivateRoute allowedRoles={['Administrator']}/>,            
                    children: [
                      {
                         path: "/roles",
                         element: <RolesPage />,
                      },
                      {
                        path: "/users",
                        element: <UsersPage />,
                     },
                     {
                        path: '/users/detail/:userId',
                        element: <UserDetailPage />,
                     },
                     {
                        path:"/register/user",
                        element:(
                            <UserFormPage
                            employees={employees}
                            errors={errors}
                            setErrors={setErrors}
                            setEmployees={setEmployees}
                            />
                        )
                    },
                    {
                        path: "/departments/new",
                        element: (
                            <DepartmentFormPage
                                employees={employees}
                                setEmployees={setEmployees}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        ),
                    },
                    {
                        path: "/departments",
                        element: (
                            <DepartmentsPage
                                departments={departments}
                                columns={columnsTableDepartments}
                                setDepartments={setDepartments}
                                refresh={refresh}
                                setRefresh={setRefresh}
                            />
                        ),
                    },
                    ]
                },
                {   
                    // {/* Route Khusus Semua User */}
                    element: <PrivateRoute allowedRoles={['Administrator','HR Manager','Department Manager','Employee Supervisor','Employee']}/>,            
                    children: [
                        {
                            path:"/profile",
                            element:(
                                <ProfilePage
                                errors={errors}
                                setErrors={setErrors}
                                />
                            )
                        },
                        {
                            path:"/reports",
                            element:(
                                <CompanyReportReact
                                departments={departments}
                                setDepartments={setDepartments}
                                />
                            )
                        },
                        {
                            path: "/employees/:id",
                            element: (
                                <EmployeeFormPageEdit
                                    setEditingEmployee={setEditingEmployee}
                                    editingEmployee={editingEmployee}
                                    setDepartments={setDepartments}
                                    departments={departments}
                                    errors={errors}
                                    setErrors={setErrors}
                                    employees={employees}
                                    setEmployees={setEmployees}
                                />
                            ),
                        },
                        {
                            path: "/employees/detail/:id",
                            element: (
                                <EmployeeDetailPage
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                    departments={departments}
                                    worksOns={worksOns}
                                    setWorksOns={setWorksOns}
                                    columns={columnsTableWorksOns}
                                />
                            ),
                        },
                        {
                            path: "/projects",
                            element: (
                                <ProjectsPage
                                    projects={projects}
                                    setProjects={setProjects}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                    columns={columnsTableProjects}
                                />
                            ),
                        },
                        {
                            path: '/assignments',
                            element: (
                                <WorksOnsPage
                                    worksOns={worksOns}
                                    setWorksOns={setWorksOns}
                                    columns={columnsTableWorksOns}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            ),
                        },
                        {
                            path: "/assignments/detail/:id",
                            element: (
                                <WorksOnDetailPage
                                    worksOns={worksOns}
                                    employees={employees}
                                    projects={projects}
                                />
                            ),
                        },
                        {
                            path: "/projects/detail/:id",
                            element: (
                                <ProjectDetailPage
                                    projects={projects}
                                    worksOns={worksOns}
                                    departments={departments}
                                    employees={employees}
                                    columns={columnsTableWorksOns}
                                />
                            ),
                        },
                        {
                            path: "/dependents",
                            element: (
                                <DependentsPage
                                   columns={columnTableDependents}
                                />
                            ),
                        },
                        {
                            path: "/dependents/new",
                            element: (
                                <DependentFormPage
                                setEditingDependent={setEditingDependent}
                                editingDependent={editingDependent}
                                setEmployees={setEmployees}
                                employees={employees}
                                errors={errors}
                                setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/dependents/:id",
                            element: (
                                <DependentFormPage
                                setEditingDependent={setEditingDependent}
                                editingDependent={editingDependent}
                                setEmployees={setEmployees}
                                employees={employees}
                                errors={errors}
                                setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/leaveRequests",
                            element: (
                                <LeaveRequestListsPage/>
                            )
                        },
                        {
                            path: "/leaveRequest/detail/:id",
                            element: (
                                <RequestLeaveDetailPage/>
                            )
                        },
                        {
                            path: "/leaveRequest/new",
                            element: (
                                <RequestLeaveFormPage
                                errors={errors}
                                setErrors={setErrors}
                                />
                            )
                        },
                    ]
                },
                {   
                    // {/* Route Khusus Employee */}
                    element: <PrivateRoute allowedRoles={['Employee']}/>,            
                    children: [
                        {
                            path:"/departments/public",
                            element:(
                                <DepartmentsPublicPage/>
                            )
                        },
                        {
                            path: "/projects/public",
                            element: (
                                <ProjectsPublicPage
                                    projects={projects}
                                    setProjects={setProjects}
                                    refresh={refresh}
                                />
                            ),
                        },
                        {
                            path: "/assignments/public",
                            element: (
                                <AssignmentPublicPage
                                    worksOns={worksOns}
                                    setWorksOns={setWorksOns}
                                    refresh={refresh}
                                />
                            ),
                        },
                     ]
                },
                {   
                    // {/* Route Khusus Manager Department */}
                    element: <PrivateRoute allowedRoles={['Department Manager']}/>,            
                    children: [
                        {
                            path:"/departments/own",
                            element:(
                                <DepartmentOwnDetailPage
                                setEmployees={setEmployees}
                                employees={employees}
                                columnsTableEmployees={columnsTableEmployees}
                                refresh={refresh}
                                setRefresh={setRefresh}
                                />
                            )
                        },
                     ]
                },
                {   
                    // {/* Route Khusus Manager Department */}
                    element: <PrivateRoute allowedRoles={['Employee Supervisor','Administrator']}/>,            
                    children: [
                        {
                            path: "/assignments/new",
                            element: (
                                <WorksOnFormPage
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    projects={projects}
                                    setProjects={setProjects}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                     ]
                },
                {   
                    // {/* Route Khusus Manager Department */}
                    element: <PrivateRoute allowedRoles={['Department Manager','Administrator']}/>,            
                    children: [
                        {
                            path: "/departments/:id",
                            element: (
                                <DepartmentFormPage
                                    editingDepartment={editingDepartment}
                                    setEditingDepartment={setEditingDepartment}
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/projects/new",
                            element: (
                                <ProjectFormPage
                                    setDepartments={setDepartments}
                                    departments={departments}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/projects/:id",
                            element: (
                                <ProjectFormPage
                                    setDepartments={setDepartments}
                                    departments={departments}
                                    editingProject={editingProject}
                                    setEditingProject={setEditingProject}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                        {
                            path: "/assignments/:id",
                            element: (
                                <WorksOnFormPage
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    projects={projects}
                                    setProjects={setProjects}
                                    editingWorksOn={editingWorksOn}
                                    setEditingWorksOn={setEditingWorksOn}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            ),
                        },
                     ]
                },
                {   
                    // {/* Route Khusus Employee SuperVisor dan department Manager */}
                    element: <PrivateRoute allowedRoles={['Employee Supervisor','Department Manager']}/>,            
                    children: [
                        {
                            path:"/employees/own",
                            element:(
                                <EmployeesOwnPage/>
                            )
                        },
                        {
                            path:"/assignment/own",
                            element:(
                                <AssignmentDepartmentPage
                                worksOns={worksOns}
                                setWorksOns={setWorksOns}
                                refresh={refresh}
                                />
                            )
                        },
                     ]
                },
                {   
                    // {/* Route Khusus Administrator dan HR Manager */}
                    element: <PrivateRoute allowedRoles={['HR Manager','Administrator']}/>,            
                    children: [
                        {
                            path: "/employees",
                            element: (
                                <EmployeesPage
                                    employees={employees}
                                    setEmployees={setEmployees}
                                    columns={columnsTableEmployees}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            )
                        },
                        {
                            path: "/employees/deactivate/:id",
                            element: (
                                <DeactivateEmployeeFormPage
                                    setErrors={setErrors}
                                    errors={errors}
                                    setEditingEmployee={setEditingEmployee}
                                    editingEmployee={editingEmployee}
                                />
                            ),
                        },
                        {
                            path: "/employees/new",
                            element: (
                                <EmployeeFormPage
                                    setErrors={setErrors}
                                    setDepartments={setDepartments}
                                    departments={departments}
                                    errors={errors}
                                    employees={employees}
                                    setEmployees={setEmployees}
                                />
                            ),
                        },
                        
                     ]
                },
                {
                    path: "/departments/detail/:id",
                    element: (
                        <DepartmentDetailPage
                        setEmployees={setEmployees}
                        employees={employees}
                        columnsTableEmployees={columnsTableEmployees}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        />
                    ),
                },
                
                {
                    path:"/login",
                    element:(
                        <LoginFormPage
                        errors={errors}
                        setErrors={setErrors}
                        />
                    )
                },
            ]
        },
        {
            path: "/unauthorized",
            element: (
                <UnauthorizedPage
                refresh={refresh}
                />
            )
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
