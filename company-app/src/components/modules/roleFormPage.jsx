import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoleService from '../../services/rolesService';

const RoleForm = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        rolesToAdd: [],
        rolesToRemove: [],
    });

    const addRolesToAdd = () => {
        setFormData({
            ...formData,
            rolesToAdd: [...formData.rolesToAdd, ''], // Tambahkan string kosong
        });
    };

    const removeRolesToAdd = (index) => {
        setFormData({
            ...formData,
            rolesToAdd: formData.rolesToAdd.filter((_, i) => i !== index),
        });
    };

    const handleRolesToAddChange = (index, value) => {
        const updatedRoles = [...formData.rolesToAdd];
        updatedRoles[index] = value;
        setFormData({ ...formData, rolesToAdd: updatedRoles });
    };

    const addRolesToRemove = () => {
        setFormData({
            ...formData,
            rolesToRemove: [...formData.rolesToRemove, ''], // Tambahkan string kosong
        });
    };

    const removeRolesToRemove = (index) => {
        setFormData({
            ...formData,
            rolesToRemove: formData.rolesToRemove.filter((_, i) => i !== index),
        });
    };

    const handleRolesToRemoveChange = (index, value) => {
        const updatedRoles = [...formData.rolesToRemove];
        updatedRoles[index] = value;
        setFormData({ ...formData, rolesToRemove: updatedRoles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await RoleService.modifyRole(userId, formData);
        setFormData({
            rolesToAdd: [],
            rolesToRemove: [],
        });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Manage Roles</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h4>Roles To Add</h4>
                                {formData.rolesToAdd.map((role, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => handleRolesToAddChange(index, e.target.value)}
                                            placeholder={`Role to Add ${index + 1}`}
                                            className="form-control"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRolesToAdd(index)}
                                            className="btn btn-danger ms-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addRolesToAdd} className="btn btn-secondary mt-2">
                                    Add Role
                                </button>
                            </div>

                            <div className="mt-4">
                                <h4>Roles To Remove</h4>
                                {formData.rolesToRemove.map((role, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => handleRolesToRemoveChange(index, e.target.value)}
                                            placeholder={`Role to Remove ${index + 1}`}
                                            className="form-control"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRolesToRemove(index)}
                                            className="btn btn-danger ms-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addRolesToRemove} className="btn btn-secondary mt-2">
                                    Remove Role
                                </button>
                            </div>

                            <button type="submit" className="btn btn-primary mt-4 w-100">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoleForm;
