import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  CircularProgress, Alert, Box, Typography
} from '@mui/material';
import { getAllResumes } from '../services/apiService';
import ResumeDetailModal from './ResumeDetailModal';

function HistoryTable() {
  // ... (state logic remains the same) ...
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getAllResumes();
        setResumes(data);
      } catch (err) {
        setError('Failed to fetch resume history.');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDetailsClick = (id) => {
    setSelectedResumeId(id);
    setIsModalOpen(true);
  };
  
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (resumes.length === 0) return <Typography align="center">No history found. Analyze a resume to get started!</Typography>;

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumes.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.file_name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.resume_rating}/10</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleDetailsClick(row.id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ResumeDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resumeId={selectedResumeId}
      />
    </Box>
  );
}

export default HistoryTable;