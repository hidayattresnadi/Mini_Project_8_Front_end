import { useState } from "react";
import LoadingSpinner from "../elements/loading";
import { Document, Page, pdfjs } from 'react-pdf';
import ReportService from "../../services/reportService";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ProjectReport = ({ setReport }) => {
    const [pdfFile, setPdfFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filename, setFileName] = useState('');
    const [showPDF, setShowPDF] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await ReportService.generateProjectReport();
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
            setShowPDF(true);
            setPageNumber(1);
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

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        setError('Error loading PDF: ' + error.message);
    };

    const goToPreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
    };

    return (
        <div className="container py-4">
            <h4 className="mb-4 text-center">Project Report</h4>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="text-center mb-4">
                <button className="btn btn-primary me-2" onClick={handleGenerateReport} disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : 'Sea Report'}
                </button>
                {pdfFile && (
                    <button className="btn btn-success" onClick={handleDownloadPDF}>Download PDF</button>
                )}
                <button className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
            </div>

            <div className="col-12">
                {/* PDF Viewer */}
                {showPDF && (
                    <div className="card">
                        <div className="card-body">
                            {isLoading && (
                                <LoadingSpinner />
                            )}

                            {error && (
                                <div className="alert alert-danger" role="alert"> {error}</div>
                            )}

                            {pdfFile && (
                                <>
                                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}
                                        onLoadError={onDocumentLoadError}
                                        loading={
                                            <div className="text-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        }>
                                        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}
                                            className="mx-auto" width={Math.min(window.innerWidth * 0.9, 800)} />
                                    </Document>

                                    {numPages && (
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <button onClick={goToPreviousPage} disabled={pageNumber <= 1} className="btn btn-primary">
                                                Previous
                                            </button>

                                            <p className="mb-0"> Page {pageNumber} of {numPages} </p>

                                            <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="btn btn-primary">
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default ProjectReport;