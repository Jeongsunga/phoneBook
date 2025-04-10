import './App.css';
import Grid from '@mui/material/Grid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className='phoneBook'>
      <h1>PhoneBook App</h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={{ xs: 7, md: 6 }}>
          <ContactForm/>
        </Grid>
        <Grid size={{ xs: 7, md: 6 }}>
          <ContactList/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
