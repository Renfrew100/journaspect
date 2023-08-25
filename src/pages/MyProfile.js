import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BoxSx() {
  return (
    <div style={{display:"flex"}}>
    <Box
      sx={{
        width: 400,
        height: 1000,
        bgcolor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
    <div>
        <div>
            <Button variant="contained">Your Name</Button>
        </div>
        <div>
            <Button variant="contained">Email</Button>
        </div>

        <br></br>

        <div>
            <Button variant="contained">Password</Button>
        </div>

        <div>
            <Button variant="contained">Blank</Button>
        </div>

        <div>
            <Button variant="contained">NewBlank</Button>
        </div>
    </div>
    </ Box>
    <div>
    <Button variant="contained">MY REVIEWS</Button>
    </div>  
    </div>
  );
  
}