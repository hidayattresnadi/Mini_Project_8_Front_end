import { useEffect, useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import RadioGroup from './radioGroup';
import SelectField from '../widgets/selectField';

const DependentForm = ({ addDependent, updateDependent, employees, errors, shouldNavigate, setShouldNavigate, editingDependent }) => {
    const [formData, setFormData] = useState({
        name: '',
        sex: '',
        birthDate: '',
        relations: '',
        employeeId: ''
    });

    useEffect(() => {
        if (editingDependent) {
            setFormData({
                name: editingDependent.name,
                sex: editingDependent.sex,
                birthDate: editingDependent.birthDate,
                relations: editingDependent.relations,
                employeeId: editingDependent.employeeId
            });
        } else {
            setFormData({
                name: '',
                sex: '',
                birthDate: '',
                relations: '',
                employeeId: ''
            });
        }
    }, [editingDependent]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingDependent) {
            const result = await updateDependent(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    sex: '',
                    birthDate: '',
                    relations: '',
                    employeeId:''
                });
                setShouldNavigate(!shouldNavigate);
            }
        } else {
            const result = await addDependent(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    sex: '',
                    birthDate: '',
                    relations: '',
                    employeeId:''
                });
                setShouldNavigate(!shouldNavigate);
            }
        }
    };

    const options = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" }
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                    <InputField
                        label="Name"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Date of Birth"
                        type="date"
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                    />
                     <InputField
                        label="Relations"
                        type="text"
                        id="relations"
                        value={formData.relations}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-12 mt-3">
                    <SelectField
                        label="Select Employee"
                        id="employeeId"
                        options={employees}
                        value={formData.employeeId}
                        labelKey={["employeeName"]}
                        valueKey={'empNo'}
                        optionTitle={'Choose Employee'}
                        onChange={(e) => handleInputChange(e, 'employeeId')}
                        className="form-select"
                    />
                    <RadioGroup
                        options={options}
                        name="sex"
                        selectedValue={formData.sex}
                        onChange={handleInputChange}
                    />
                    {errors?.sex && <h6 className="text-start">{errors.sex}</h6>}
                </div>

                <div className="col-12 mt-3">
                    <Button type="submit" className="btn btn-primary mt-3 w-100">
                        Submit
                    </Button>
                </div>
            </form>
        </>
    );
};

export default DependentForm;
