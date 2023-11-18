import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const DataTable = (props) => {
    const {paymentData, formatNumber} = props;
    const columnsToDisplay = ['id', 'movement', 'client', 'antiguedad', 'days', 'amount'];

    const columnTranslations = {
        id: 'Fianza',
        movement: 'Movimiento',
        client: 'Fiado',
        antiguedad: 'Antigüedad',
        days: 'Días de vencimiento',
        amount: 'Importe',
    };

    return (
        <div className='table-container'>
            <Table className='info-table'>
                <TableHead>
                    <TableRow>
                        {columnsToDisplay.map((column) => (
                            <TableCell key={column}><div className='table-text bold-text'>{columnTranslations[column]}</div></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentData &&
                        paymentData.map((row) => (
                            <TableRow key={row.id}>
                                {columnsToDisplay.map((column) => (
                                    <TableCell key={column}><div className='table-text'>{column === "amount" ? formatNumber(row[column]) : row[column]}</div></TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
