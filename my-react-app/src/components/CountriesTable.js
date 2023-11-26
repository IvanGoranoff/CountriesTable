import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function CountriesTable({ countries }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="countries table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Флаг</TableCell>
                            <TableCell>Име</TableCell>
                            <TableCell>Столица</TableCell>
                            <TableCell>Континент</TableCell>
                            <TableCell>Валута</TableCell>
                            <TableCell>CCA3</TableCell>
                            <TableCell>Население</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country) => (
                            <TableRow key={country.cca3}>
                                <TableCell component="th" scope="row">
                                    <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '50px' }} />
                                </TableCell>
                                <TableCell>{country.name.common}</TableCell>
                                <TableCell>{country.capital}</TableCell>
                                <TableCell>{country.continents}</TableCell>
                                <TableCell>{Object.values(country.currencies || {}).map(c => c.name).join(', ')}</TableCell>
                                <TableCell>{country.cca3}</TableCell>
                                <TableCell>{country.population.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={countries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default CountriesTable;
