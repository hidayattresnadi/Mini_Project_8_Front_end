import axios from 'axios';
import { failedSwal, formatDateWithOrdinal } from '../../helper';
import Button from '../elements/button';
import Icon from '../elements/icon';
import TableCell from '../elements/tableCell';

const TableLeaveRequestRow = ({ onDetail, leaveRequest }) => {
    const handleDownload = async (fileName) => {
        try {
          const response = await axios.get(`http://localhost:5115/Employee/download/${fileName}`, {
            responseType: 'blob', // Mengharapkan response sebagai binary file
          });
    
          // Membuat URL untuk file yang diunduh
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName); // Nama file yang diunduh
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Error downloading file:', error);
          failedSwal('Failed to download the file.');
        }
      };
    
    return (
        <tr>
            <TableCell>{leaveRequest.processId}</TableCell>
            <TableCell>{leaveRequest.employeeName}</TableCell>
            <TableCell>{leaveRequest.startDate}</TableCell>
            <TableCell>{leaveRequest.endDate}</TableCell>
            <TableCell>{leaveRequest.totalDays}</TableCell>
            <TableCell>{leaveRequest.leaveType}</TableCell>
            <TableCell>{leaveRequest.reason}</TableCell>
            <TableCell>{formatDateWithOrdinal(leaveRequest.requestDate)}</TableCell>
            <TableCell><button className={leaveRequest.fileName === "No file name provided" ? "btn btn-success disabled" : "btn btn-success" } onClick={() => handleDownload(leaveRequest.fileName)}>Download</button>
            </TableCell>
            <TableCell>
                {leaveRequest.status === "Accepted" ? (
                    <Button className="btn btn-success btn-sm not-clickable">
                        <Icon className="bi bi-check-circle-fill"></Icon> Accepted
                    </Button>
                ) : leaveRequest.status === "Rejected" ? (
                    <Button className="btn btn-danger btn-sm not-clickable">
                        <Icon className="bi bi-x-circle-fill"></Icon> Rejected
                    </Button>
                ) : (
                    <Button className="btn btn-warning btn-sm not-clickable" disabled>
                        <Icon className="bi bi-exclamation-circle-fill"></Icon> {leaveRequest.status}
                    </Button>
                )}
            </TableCell>
    
    
            <TableCell>
                <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Leave Request">
                    <Icon className="fas fa-eye" />
                </Button>
            </TableCell>
        </tr>
    );

}


export default TableLeaveRequestRow;
