import { UpdateLessonVideo } from "../api";
import ErrorAlert from "./Alerts/ErrorAlert";
import { v4 as uuidv4 } from 'uuid';



export const uploadFileInChunks = async (fieUploadUUID,uploadType, file, updateProgressCallback, setUploading) => {
    if (!file) {
      ErrorAlert('Error', 'No file selected.');
      setUploading(false)
      return;
    }

    setUploading(true)
  
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
        formData.append('fileName', fieUploadUUID + "_" + file.name);
        formData.append('fileSize', file.size);
        formData.append('type', uploadType);
  
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
      setUploading(false)
      ErrorAlert('Error', 'Error uploading file');
    }finally{
      setUploading(false)
    }
  };
  