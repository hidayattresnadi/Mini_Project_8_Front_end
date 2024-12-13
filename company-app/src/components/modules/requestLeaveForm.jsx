import { useEffect, useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import { useSelector } from 'react-redux';
import SelectOption from '../elements/selectOptions';
import Container from '../elements/container';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const RequestLeaveForm = ({ addLeaveRequest, errors }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 2MB dalam bytes
    const ALLOWED_FILE_TYPES = [
        "application/pdf", // PDF
        "image/jpeg", // JPG/JPEG
        "image/jpg", // JPG
    ];

    const validateFile = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            return 'File size exceeds 2MB limit';
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return 'Only PDF and Word documents are allowed';
        }
        return null;
    };
    const { user: currentUser } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        employeeId: currentUser.user.employeeId,
        startDate: '',
        endDate: '',
        leaveType: '',
        reason: '',
        totalDays: 0,
        fileName: ''
    });


    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validationError = validateFile(file);
            if (validationError) {
                toast.error(validationError);
                setSelectedFile(null);
                event.target.value = ''; // Reset input file
                return;
            }
            setSelectedFile(file);
            toast.info(`File selected: ${file.name}`);
            setUploadProgress(0);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleUpload = async () => {
        // if (!selectedFile) {
        //     toast.error('Please select a file first');
        //     return;
        // }

        setIsLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('formFile', selectedFile);

        try {
            const response = await axios.post('http://localhost:5115/Employee/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                },
            });
            toast.success(response.data);
            setSelectedFile(null);
            document.getElementById('fileInput').value = '';
            return response;
        } catch (error) {
            let errorMessage = 'Upload failed';
            if (error.response) {
                errorMessage = `Upload failed: ${error.response.data}`;
            } else if (error.request) {
                errorMessage = 'No response from server';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedFormData = { ...formData };
        if (selectedFile) {
            const uploadSuccess = await handleUpload();
            if (!uploadSuccess) {
                return;
            }
            updatedFormData = {
                ...updatedFormData,
                fileName: uploadSuccess.data,
            };
        }
        
        const result = await addLeaveRequest(updatedFormData);
        if (Object.keys(result).length === 0) {
            setFormData({
                employeeId: currentUser.user.employeeId,
                startDate: '',
                endDate: '',
                leaveType: '',
                reason: '',
                totalDays: 0,
                fileName: ''
            });
        }

    };

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);

            if (end >= start) {
                const diffTime = end - start;
                const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24) + 1);
                setFormData(prev => ({ ...prev, totalDays: diffDays }));
            }
        }
    }, [formData.startDate, formData.endDate]);

    const today = new Date().toISOString().split("T")[0]; 

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form onSubmit={handleSubmit}>
                {/* Employee Name */}
                <div className="mb-3">
                    <label htmlFor="employeeName" className="form-label fw-bold mb-4 mt-2">Employee Name</label>
                    <select
                        id="employeeName"
                        className="form-select"
                        onChange={handleInputChange}
                    >
                        <SelectOption value={currentUser.user.employeeId}>
                            {currentUser.employeeName}
                        </SelectOption>
                    </select>
                </div>

                {/* Start Date */}
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label fw-bold mb-2">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`form-control ${errors?.startDate ? "is-invalid" : ""}`}
                        min={today}
                    />
                    {errors?.startDate && (
                        <div className='text-danger mb-3'>{errors.startDate}</div>
                    )}
                </div>

                {/* End Date */}
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label fw-bold mb-2">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className={`form-control ${errors?.endDate ? "is-invalid" : ""}`}
                        min={formData.startDate || new Date().toISOString().split("T")[0]}
                    />
                    {errors?.endDate && (
                        <Container className='text-danger mb-3'>{errors.endDate}</Container>
                    )}
                </div>

                {/* Total Days */}
                <div className="mb-3">
                    <label htmlFor="totalDays" className="form-label fw-bold mb-2">Total Days</label>
                    <InputField
                        type="number"
                        id="totalDays"
                        value={formData.totalDays}
                        readOnly
                        className={`form-control`}
                    />
                </div>

                {/* Leave Type */}
                <div className="mb-3">
                    <label htmlFor="leaveType" className="form-label fw-bold mb-4 mt-2">Select Leave Type</label>
                    <select
                        id="leaveType"
                        className={`form-select`}
                        onChange={handleInputChange}
                        value={formData.leaveType}
                    >
                        <SelectOption value="" disabled={true}>
                            Please select leave type
                        </SelectOption>
                        <SelectOption value="Annual Leave">Annual Leave</SelectOption>
                        <SelectOption value="Sick Leave">Sick Leave</SelectOption>
                        <SelectOption value="Personal Leave">Personal Leave</SelectOption>
                    </select>
                    {errors?.leaveType &&
                        <div className='text-danger mb-3'>{errors.leaveType}</div>
                    }
                </div>

                {/* Reason */}
                <div className="mb-4">
                    <label htmlFor="reason" className="form-label fw-bold">Reason</label>
                    <InputField
                        type="text"
                        id="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className={`form-control ${errors?.reason ? "is-invalid" : ""}`}
                    />
                    {errors?.reason && (
                        <div className='text-danger mb-3'>{errors.reason}</div>
                    )}
                </div>

                <div className="col-md-12">
                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">Choose File (PDF or Word, max 2MB)</label>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileSelect}
                            className="form-control"
                            accept=".pdf,.doc,.docx"
                        />
                        {selectedFile && (
                            <div className="mt-2 text-muted">
                                Selected file: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                            </div>
                        )}
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mb-3">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${uploadProgress}%` }}
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-5">
                    <Button className="btn btn-primary btn-lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Submit Request"}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default RequestLeaveForm;
