import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CountryModal({ country, open, onClose }) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" align="center" gutterBottom>
                    {country?.name?.common}
                </Typography>
                <Box display="flex" justifyContent="center" my={2}>
                    <img src={country?.flags?.svg} alt={`${country?.name?.common} flag`} style={{ width: '100px', borderRadius: '5px' }} />
                </Box>
                <Typography align="center">Столица: {country?.capital?.[0]}</Typography>
                <Typography align="center">Континент: {country?.continents?.[0]}</Typography>
                <Typography align="center">Валути: {Object.values(country?.currencies || {}).map(c => c.name).join(', ')}</Typography>
                <Typography align="center">Код CCA3: {country?.cca3}</Typography>
                <Typography align="center">Население: {country?.population?.toLocaleString()}</Typography>
            </Box>
        </Modal>
    );
}



export default CountryModal;
