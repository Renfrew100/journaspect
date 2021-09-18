import * as React from "react";
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import BackupIcon from '@mui/icons-material/Backup';
import defaultProfile from '../assets/DefaultProfile.jpeg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function AddJournalist(){
  const [displayPicture, setDisplayPicture] = React.useState(null);
  const [preview, setPreview] = React.useState(defaultProfile);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('First Name'), data.get('Last Name'));
    console.log(displayPicture);
    // signUp(data.get('email'), data.get('password'));
  };

  const handlePreview = (event) => {
    setDisplayPicture(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Typography component="h1" variant="h4">
            Add Journalist
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black', borderRadius: '5px'}}>
                  <img src={preview} style={{maxWidth: '100%', maxHeight: '100%'}} />
                </Grid>
              </div>
              <Grid item xs={12}>
                <TextField
                  name="First Name"
                  required
                  fullWidth
                  id="First Name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Last Name"
                  required
                  fullWidth
                  id="Last Name"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="inherit">
                  <label for="upload">
                    <BackupIcon /> Upload Photo
                  </label>
                  <input id="upload" type="file" accept="image/png, image/jpeg, image/jpg" multiple = "false" style={{display: 'none'}} onChange={handlePreview}/>
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddJournalist;
