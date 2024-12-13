import { useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import SelectField from '../widgets/selectField';

const UserForm = ({ addUser, employees, errors, shouldNavigate, setShouldNavigate }) => {
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        employeeId: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addUser(formData);
        if (Object.keys(result).length === 0) {
            setFormData({
                email: '',
                userName: '',
                employeeId: '',
                password: ''
            });
            setShouldNavigate(!shouldNavigate);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="User Name"
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                />
                {errors?.userName ? <h6 className='text-start'>{errors.userName}</h6> : ''}

                <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors?.email ? <h6 className='text-start'>{errors.email}</h6> : ''}

                <InputField
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <SelectField
                    label="Select Employee"
                    id="employeeId"
                    options={employees}
                    value={formData.employeeId}
                    labelKey={["employeeName"]}
                    valueKey={'empNo'}
                    optionTitle={'Choose Employee'}
                    onChange={(e) => handleInputChange(e)}
                    className="form-select"
                />
                {errors?.mgrEmpNo ? <h6 className='text-start'>{errors.mgrEmpNo}</h6> : ''}

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default UserForm;
