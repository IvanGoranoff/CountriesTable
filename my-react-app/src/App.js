import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CountriesTable from './components/CountriesTable';
import CountryModal from './components/CountryModal';
import SearchBar from './components/SearchBar'; // Импортиране на SearchBar
import Container from '@mui/material/Container';

function App() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const columnsConfig = [
        { id: 'flags', label: 'Flag', render: (data) => <img src={data.flags.svg} alt={`${data.name.common} flag`} style={{ width: '50px' }} /> },
        { id: 'name', label: 'Name', render: (data) => data.name.common },
        { id: 'capital', label: 'Capital', render: (data) => data.capital },
        { id: 'continents', label: 'Continent', render: (data) => data.continents.join(', ') },
        { id: 'currencies', label: 'Currencies', render: (data) => Object.values(data.currencies || {}).map(c => c.name).join(', ') },
        { id: 'cca3', label: 'CCA3', render: (data) => data.cca3 },
        { id: 'population', label: 'Population', render: (data) => data.population.toLocaleString() },
    ];


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setFilteredCountries(data); // Инициализиране на филтрираните страни
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleOpenModal = (country) => {
        setSelectedCountry(country);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectCountry = (selectedCountry) => {
        // Филтриране на таблицата според избраната страна
        if (selectedCountry) {
            setFilteredCountries([selectedCountry]);
            setSelectedCountry(selectedCountry); // Задаване на избраната страна
            setModalOpen(true); // Отваряне на модалния прозорец
        } else {
            setFilteredCountries(countries);
        }
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Списък на страните
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                <SearchBar onSelectCountry={handleSelectCountry} />
                <CountriesTable countries={filteredCountries} columnsConfig={columnsConfig} onOpenModal={handleOpenModal} />
                <CountryModal country={selectedCountry} open={modalOpen} onClose={handleCloseModal} />
            </Container>
        </div>
    );
}

export default App;
