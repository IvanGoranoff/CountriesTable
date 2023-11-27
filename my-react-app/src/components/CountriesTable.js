import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';

function CountriesTable({ countries }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const getSortableValue = (country, key) => {
        if (key === 'name') {
            return country.name.common;
        }
        return country[key];
    };

    const sortedCountries = useMemo(() => {
        let sortableCountries = [...countries];
        if (sortConfig.key !== null) {
            sortableCountries.sort((a, b) => {
                const aValue = getSortableValue(a, sortConfig.key);
                const bValue = getSortableValue(b, sortConfig.key);

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCountries;
    }, [countries, sortConfig]);

    const requestSort = (key) => {
        const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
        setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
    }

    const createSortHandler = (property) => (event) => {
        requestSort(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="countries table">
                    <TableHead>
                        <TableRow>
                            {['flags', 'name', 'capital', 'continents', 'currencies', 'cca3', 'population'].map((headCell) => (
                                <TableCell
                                    key={headCell}
                                    sortDirection={sortConfig.key === headCell ? sortConfig.direction : false}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === headCell}
                                        direction={sortConfig.key === headCell ? sortConfig.direction : 'asc'}
                                        onClick={createSortHandler(headCell)}
                                    >
                                        {headCell}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCountries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country) => (
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
