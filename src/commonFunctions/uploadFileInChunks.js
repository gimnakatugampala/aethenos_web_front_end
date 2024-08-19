import { UpdateLessonVideo } from "../api";
import ErrorAlert from "./Alerts/ErrorAlert";

export const uploadFileInChunks = async (file, updateProgressCallback) => {
    if (!file) {
      ErrorAlert('Error', 'No file selected.');
      return;
    }
  
    const CHUNK_SIZE = 5 * 1024 * 1024; // Default to 5MB if not provided
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;
    let start = 0, end;
  
    try {
      const startTime = new Date();
  
      for (let i = 1; i <= totalChunks; i++) {
        end = start + CHUNK_SIZE;
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('index', i);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', file.name);
        formData.append('fileSize', file.size);
  
        await UpdateLessonVideo(formData);
  
        uploadedChunks++;
        const progress = Math.floor((uploadedChunks / totalChunks) * 100);
        updateProgressCallback && updateProgressCallback(progress);
  
        start = end;
      }
  
      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log('Time elapsed:', timeElapsed, 'seconds');
  
    } catch (err) {
      console.error('Error uploading file:', err);
      ErrorAlert('Error', 'Error uploading file');
    }
  };
  