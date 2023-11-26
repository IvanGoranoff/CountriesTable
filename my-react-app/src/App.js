import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CountriesTable from './components/CountriesTable';
import SearchBar from './components/SearchBar'; // Импортиране на SearchBar
import Container from '@mui/material/Container';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data); // Инициализиране на филтрираните страни
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleSelectCountry = (selectedCountry) => {
    // Филтриране на таблицата според избраната страна
    if (selectedCountry) {
      setFilteredCountries([selectedCountry]);
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
        <CountriesTable countries={filteredCountries} />
      </Container>
    </div>
  );
}

export default App;
