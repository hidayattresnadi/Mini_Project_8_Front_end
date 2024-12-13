import TableHeader from '../widgets/tableHeader';
import TableDependentRow from '../widgets/tableDependentRow';
import { useNavigate } from 'react-router-dom';


const TableDependents = ({ dependents,  columns, onDelete }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {dependents.map((dependent) => (
                        <TableDependentRow
                            key={dependent.dependentId}
                            dependent={dependent}
                            onDelete={() => onDelete(dependent.dependentId)}
                            onDetail={() => {
                                navigate(`/dependents/detail/${dependent.dependentId}`)
                            }}
                            onEdit={() => {
                                navigate(`/dependents/${dependent.dependentId}`)
                            }}

                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableDependents;
