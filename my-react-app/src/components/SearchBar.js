import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SearchBar({ onSelectCountry }) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (inputValue.length > 0) {
            fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
                .then(response => response.json())
                .then(data => setOptions(data.slice(0, 10)))
                .catch(error => console.error('Error fetching data: ', error));
        }
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
            renderInput={(params) => <TextField {...params} label="Търсене на страна" />}
        />
    );
}

export default SearchBar;
