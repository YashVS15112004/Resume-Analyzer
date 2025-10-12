import React, { useState } from 'react';
import { Button, Box, CircularProgress, Alert, Typography, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { uploadResume } from '../services/apiService';
import ResultsDisplay from './ResultsDisplay';

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await uploadResume(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'An unexpected error occurred.');
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container using Flexbox for centering
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Horizontally center all children
        gap: 2, // Add space between children
      }}
    >
      <Paper
        variant="outlined"
        component="label" // Make the Paper component act as a label for the input
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: 'grey.400',
          borderRadius: 2,
          cursor: 'pointer',
          width: '100%',
          maxWidth: '500px',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
          // Centering content inside the dropzone
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <UploadFileIcon sx={{ fontSize: 50, color: 'grey.500', mb: 1 }} />
        <Typography variant="h6" component="div">
          Click to browse or Drag & Drop
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedFile ? `Selected: ${selectedFile.name}` : 'PDF only'}
        </Typography>
        <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
      </Paper>
      
      <Button
        variant="contained"
        size="large"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        sx={{ minWidth: '220px' }} // Give the button a consistent width
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze My Resume'}
      </Button>

      {/* Error and Results section */}
      <Box sx={{ width: '100%', mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {analysisResult && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
              Analysis Complete
            </Typography>
            <ResultsDisplay data={analysisResult} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FileUploader;