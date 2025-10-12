import axios from 'axios';

// The base URL of your FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Uploads a resume file to the backend for analysis.
 * @param {File} file - The resume file to upload.
 * @returns {Promise<Object>} The analysis result from the API.
 */
export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Fetches a list of all previously analyzed resumes.
 * @returns {Promise<Array>} A list of resume objects.
 */
export const getAllResumes = async () => {
    const response = await axios.get(`${API_BASE_URL}/resumes`);
    return response.data;
};

/**
 * Fetches the detailed analysis for a specific resume by its ID.
 * @param {number} resumeId - The ID of the resume.
 * @returns {Promise<Object>} The detailed resume analysis.
 */
export const getResumeById = async (resumeId) => {
    const response = await axios.get(`${API_BASE_URL}/resumes/${resumeId}`);
    return response.data;
};