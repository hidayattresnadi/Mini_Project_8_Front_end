import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';
import WorksOnForm from '../modules/worksOnForm';
import FormLayout from '../templates/FormLayout';
import { useEffect, useState } from 'react';
import { failedSwal, successSwal, validateWorksOn } from '../../helper';
import WorksOnService from '../../services/worksOns';
import ProjectService from '../../services/projectService';
import EmployeeService from '../../services/employeeService';
import { useSelector } from 'react-redux';

function WorksOnFormPage({ setEmployees, employees, projects, setProjects, editingWorksOn,setEditingWorksOn, errors, setErrors }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const { user: currentUser } = useSelector(state => state.auth);

    let isSuperVisor = currentUser?.roles.includes("Employee Supervisor")

    const addWorksOn = async (worksOn) => {
        try {
            const listErrors = validateWorksOn(worksOn)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await WorksOnService.create(worksOn)
                successSwal('WorksOn Added successfully');
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    const updateWorksOn = async (worksOn) => {
        try {
            const listErrors = validateWorksOn(worksOn);
            setErrors(listErrors);

            if (Object.keys(listErrors).length === 0) {
                await WorksOnService.update(id,worksOn)
                successSwal('WorksOn Edited successfully');
                setEditingWorksOn(null);
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data;
        }

    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const ProjectResponse = await ProjectService.getAll()
                setProjects(ProjectResponse.data);

                const EmployeeResponse = await EmployeeService.getAll()
                setEmployees(EmployeeResponse.data.data);
                if (!id) {
                    setLoading(false);
                    return;
                }

                const worksOnResponse = await WorksOnService.get(id)
                setEditingWorksOn(worksOnResponse.data);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [id, setProjects, setEmployees, setEditingWorksOn, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            if(!isSuperVisor) {
                navigate('/assignments');
            }
            else if (isSuperVisor) {
                navigate('/assignment/own');
            }
            
        }
    }, [shouldNavigate, navigate])



    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading projects</p>;

    return (
        <FormLayout title={editingWorksOn ? "Form to Update Works On" : "Form to Add Works On"}>
            <WorksOnForm 
                addWorksOn={addWorksOn}
                employees={employees}
                projects={projects} 
                updateWorksOn={updateWorksOn} 
                editingWorksOn={editingWorksOn}  
                errors={errors}
                setShouldNavigate={setShouldNavigate}
                shouldNavigate={shouldNavigate} 
            />
        </FormLayout>
    )
}

export default WorksOnFormPage;