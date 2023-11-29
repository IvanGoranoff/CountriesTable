import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SearchBar({ onSelectCountry }) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const fetchCountries = debounce((input) => {
        if (input.length > 0) {
            fetch(`https://restcountries.com/v3.1/name/${input}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Country not found');
                    }
                    return response.json();
                })
                .then(data => setOptions(data.slice(0, 10)))
                .catch(error => {
                    console.error('Error fetching data: ', error);
                    setOptions([]); // Изчистване на опциите при грешка
                });
        } else {
            setOptions([]); // Изчистване на опциите, ако няма вход
        }
    }, 500); // половин секунда забавяне


    useEffect(() => {
        fetchCountries(inputValue);
    }, [inputValue]);

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name.common}
            style={{ width: 300, marginBottom: '20px' }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
                onSelectCountry(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Searching country..." />}
        />
    );
}

export default SearchBar;
