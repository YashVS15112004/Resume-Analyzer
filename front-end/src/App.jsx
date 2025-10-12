import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container, Paper, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import HistoryTable from './components/HistoryTable';
import FileUploader from './components/FileUploader';

// Create a simple, clean theme
const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    primary: {
      main: '#0052cc',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h4" component="h1">
              📄 AI Resume Analyzer
            </Typography>
            <Typography>
              Get instant feedback to improve your resume
            </Typography>
          </Box>
          <Tabs value={activeTab} onChange={handleChange} centered variant="fullWidth">
            <Tab icon={<DescriptionIcon />} iconPosition="start" label="Analyze New Resume" />
            <Tab icon={<HistoryIcon />} iconPosition="start" label="Analysis History" />
          </Tabs>

          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            {activeTab === 0 && <FileUploader />}
            {activeTab === 1 && <HistoryTable />}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;