import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Chip, Grid, LinearProgress, Paper, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';

const SectionCard = ({ title, icon, children }) => (
  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>{title}</Typography>
    </Box>
    <Divider />
    <Box sx={{ pt: 1.5 }}>
      {children}
    </Box>
  </Paper>
);

function ResultsDisplay({ data }) {
  if (!data) return null;

  const ratingPercentage = (data.resume_rating || 0) * 10;

  return (
    <Grid container spacing={3}>
      {/* Contact & Score */}
      <Grid item xs={12} md={8}>
        <SectionCard title="Candidate Profile" icon={<AccountCircleIcon color="primary" />}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
          <Typography color="text.secondary">{data.email} | {data.phone}</Typography>
        </SectionCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <SectionCard title="Resume Score" icon={<RocketLaunchIcon color="primary" />}>
           <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {data.resume_rating} / 10
            </Typography>
            <LinearProgress variant="determinate" value={ratingPercentage} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        </SectionCard>
      </Grid>
      
      {/* Experience & Education */}
      <Grid item xs={12} md={6}>
        <SectionCard title="Work Experience" icon={<BusinessCenterIcon color="primary" />}>
          {data.work_experience?.map((exp, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Typography variant="body1" component="div"><b>{exp.title}</b></Typography>
              <Typography variant="body2" color="text.secondary">{exp.company} ({exp.dates})</Typography>
            </Box>
          ))}
        </SectionCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SectionCard title="Education" icon={<SchoolIcon color="primary" />}>
           {data.education?.map((edu, index) => (
            <Box key={index} sx={{ my: 1 }}>
              <Typography variant="body1" component="div"><b>{edu.degree}</b></Typography>
              <Typography variant="body2" color="text.secondary">{edu.institution} ({edu.dates})</Typography>
            </Box>
          ))}
        </SectionCard>
      </Grid>

      {/* Skills */}
      <Grid item xs={12}>
        <SectionCard title="Skills" icon={<CodeIcon color="primary" />}>
          <Box>
            {data.hard_skills?.map(skill => <Chip label={skill} key={skill} sx={{ m: 0.5 }} color="primary" variant="outlined" />)}
            {data.soft_skills?.map(skill => <Chip label={skill} key={skill} sx={{ m: 0.5 }} />)}
          </Box>
        </SectionCard>
      </Grid>

      {/* LLM Analysis */}
      <Grid item xs={12} md={6}>
        <SectionCard title="Improvement Areas" icon={<LightbulbIcon color="primary" />}>
          <List dense>
            {data.improvement_areas?.map((item, index) => (
              <ListItem key={index}><ListItemText primary={`- ${item}`} /></ListItem>
            ))}
          </List>
        </SectionCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SectionCard title="Upskill Suggestions" icon={<RocketLaunchIcon color="primary" />}>
          <List dense>
            {data.upskill_suggestions?.map((item, index) => (
               <ListItem key={index}>
                  <ListItemText primary={<b>{item.skill}</b>} secondary={item.reason} />
               </ListItem>
            ))}
          </List>
        </SectionCard>
      </Grid>
    </Grid>
  );
}

export default ResultsDisplay;