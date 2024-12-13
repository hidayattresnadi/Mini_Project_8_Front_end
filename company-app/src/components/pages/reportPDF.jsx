import axios from "axios";
import { useEffect, useState } from "react";
import DepartmentService from "../../services/departmentService";
import SelectField from "../widgets/selectField";

const CompanyReport = ({setDepartments, departments }) => {
    const [pdfFile, setPdfFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filename, setFileName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const DepartmentResponse = await DepartmentService.getAll();
                setDepartments(DepartmentResponse.data.data);
                return;
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [setDepartments]);

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await axios.get('http://localhost:5115/WorksOn/generate_report', {
                headers: { "Content-Type": 'application/pdf' },
                responseType: 'blob',
            });
            const contentDisposition = response.headers['content-disposition'];
            let tempfilename = 'BookReport.pdf';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    tempfilename = filenameMatch[1].replace(/['"]/g, '');
                    setFileName(tempfilename);
                }
            }

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfUrl);
        } catch (err) {
            setError('Failed to get report, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (pdfFile) {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    };

    const handleBack = () => {
        setPdfFile(null);
        setError(null);
        setIsLoading(false);
        setReport('');
    };

    const handleGenerateReportSearch = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await axios.get('http://localhost:5115/LeaveRequest/generate_report', {
                headers: { "Content-Type": 'application/pdf' },
                params: { startDate, endDate },
                responseType: 'blob',
            });
            const contentDisposition = response.headers['content-disposition'];
            let tempfilename = 'BookReport.pdf';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    tempfilename = filenameMatch[1].replace(/['"]/g, '');
                    setFileName(tempfilename);
                }
            }

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfUrl);
        } catch (err) {
            setError('Failed to get report, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateDepartmentReport = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await axios.get(`http://localhost:5115/Employee/generate_report/${departmentId}`, {
                headers: { "Content-Type": 'application/pdf' },
                responseType: 'blob',
            });
            const contentDisposition = response.headers['content-disposition'];
            let tempfilename = 'BookReport.pdf';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    tempfilename = filenameMatch[1].replace(/['"]/g, '');
                    setFileName(tempfilename);
                }
            }

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfUrl);
        } catch (err) {
            setError('Failed to get report, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (report === "Project Report") {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Project Report</h4>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center mb-4">
                    <button className="btn btn-primary me-2" onClick={handleGenerateReport} disabled={isLoading}>
                        {isLoading ? 'Menghasilkan Laporan...' : 'Lihat Laporan'}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>Download PDF</button>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
                </div>

                {pdfFile && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe src={pdfFile} width="100%" height="500" className="embed-responsive-item" title="PDF Preview">
                            Your Browser does not support PDF view
                        </iframe>
                    </div>
                )}
            </div>
        );
    } else if (report === "Total Leaves Taken in a Time Period") {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Total Leaves Taken in a Time Period</h4>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">Start Date:</label>
                        <input type="date" id="startDate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">End Date:</label>
                        <input type="date" id="endDate" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center mb-4">
                    <button className="btn btn-primary me-2" onClick={handleGenerateReportSearch} disabled={isLoading}>
                        {isLoading ? 'Menghasilkan Laporan...' : 'Lihat Laporan'}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>Download PDF</button>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
                </div>

                {pdfFile && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe src={pdfFile} width="100%" height="500" className="embed-responsive-item" title="PDF Preview">
                            Your Browser does not support PDF view.
                        </iframe>
                    </div>
                )}
            </div>
        );
    } else if (report === "List of Employees per Department") {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">List of Employees per Department</h4>
                <div className="mb-3 row">
                <SelectField
                        label="Select Department"
                        id="departmentId"
                        options={departments}
                        value={departmentId}
                        labelKey={["departmentName"]}
                        valueKey={"departmentID"}
                        optionTitle={"Choose Department"}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="form-select"
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center mb-4">
                    <button className="btn btn-primary me-2" onClick={handleGenerateDepartmentReport} disabled={isLoading}>
                        {isLoading ? 'Menghasilkan Laporan...' : 'Lihat Laporan'}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>Download PDF</button>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
                </div>

                {pdfFile && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe src={pdfFile} width="100%" height="500" className="embed-responsive-item" title="PDF Preview">
                            Your Browser does not support PDF view.
                        </iframe>
                    </div>
                )}
            </div>
        );
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

export default CompanyReport;