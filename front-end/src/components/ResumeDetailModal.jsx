import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getResumeById } from '../services/apiService';
import ResultsDisplay from './ResultsDisplay';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ResumeDetailModal({ open, onClose, resumeId }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && resumeId) {
      const fetchDetails = async () => {
        setLoading(true);
        setError('');
        setDetails(null);
        try {
          const data = await getResumeById(resumeId);
          setDetails(data);
        } catch (err) {
          setError('Failed to fetch resume details.');
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [open, resumeId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>
          Resume Details
        </Typography>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {details && <ResultsDisplay data={details} />}
      </Box>
    </Modal>
  );
}

export default ResumeDetailModal;