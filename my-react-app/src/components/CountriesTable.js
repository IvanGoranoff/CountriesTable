import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';
import CountryModal from './CountryModal'

function CountriesTable({ countries, columnsConfig, onOpenModal }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showProgressBar, setShowProgressBar] = useState(false);

    // const [selectedCountry, setSelectedCountry] = useState(null);
    // const [modalOpen, setModalOpen] = useState(false);

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

    const handleMouseDown = (country) => {
        setShowProgressBar(true);
        setTimeout(() => {
            onOpenModal(country);
            setShowProgressBar(false);
        }, 1000); // 1 секунди
    }

    const handleMouseUp = () => {
        setShowProgressBar(false);
        clearTimeout(); // Спира таймера, ако потребителят пусне бутона преди времето
    };

    // const handleRowClick = (country) => {
    //     setSelectedCountry(country);
    //     console.log(selectedCountry)
    //     setModalOpen(true);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <div className="progress-bar" style={{ width: showProgressBar ? '100%' : '0%' }}></div>
            <TableContainer>
                <Table stickyHeader aria-label="countries table">
                    <TableHead>
                        <TableRow>
                            {columnsConfig.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sortDirection={sortConfig.key === column.id ? sortConfig.direction : false}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === column.id}
                                        direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCountries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country) => (
                            <TableRow className="clickable-row" key={country.cca3} onMouseDown={() => handleMouseDown(country)} onMouseUp={handleMouseUp}>
                                {columnsConfig.map((column) => (
                                    <TableCell key={`${country.cca3}-${column.id}`}>
                                        {column.render(country)}
                                    </TableCell>
                                ))}
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
            {/* <CountryModal country={selectedCountry} open={modalOpen} onClose={() => setModalOpen(false)} /> */}

        </Paper>

    );
}

export default CountriesTable;
