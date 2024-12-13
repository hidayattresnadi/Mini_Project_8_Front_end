import { useState, useEffect } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import SelectField from '../widgets/selectField';

const ProjectForm = ({ addProject, departments, updateProject, editingProject, errors, shouldNavigate, setShouldNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        deptId: '',
        locationName:''
    });

    useEffect(() => {
        if (editingProject) {
            setFormData({
                name: editingProject.name,
                deptId: editingProject.deptId,
                locationName:editingProject.locationName
            });
        } else {
            setFormData({
                name: '',
                deptId: '',
                locationName:''
            });
        }
    }, [editingProject]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingProject) {
            const result = await updateProject(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    deptId: '',
                    locationName:''
                });
                setShouldNavigate(!shouldNavigate)
            }
        } else {
            const result = await addProject(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    deptId: '',
                    locationName:''
                });
                setShouldNavigate(!shouldNavigate)
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Project Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <InputField
                    label="Location"
                    type="text"
                    id="locationName"
                    value={formData.locationName}
                    onChange={handleInputChange}
                />
                <SelectField
                    label="Select Department"
                    id="deptId"
                    options={departments}
                    value={formData.deptId}
                    labelKey={["departmentName"]}
                    valueKey={'departmentID'}
                    optionTitle={'Choose Department'}
                    onChange={(e) => handleInputChange(e, 'deptNo')}
                    className="form-select"
                />

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default ProjectForm;
