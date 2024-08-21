import React from 'react';
import ErrorAlert from './Alerts/ErrorAlert';
import { UpdateLessonVideo } from '../api';

export const uploadSyllabusVideoChunks = async (
    fieUploadUUID,
    uploadType,
    file,
    updateProgressCallback,
    setUploading,
    onUploadComplete,
    abortController // Pass the AbortController as an argument,
  ) => {
    if (!file) {
      ErrorAlert('Error', 'No file selected.');
      setUploading(false);
      return;
    }
  
    setUploading(true);
  
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;
    let start = 0, end;
  
    try {
      const startTime = new Date();
  
      for (let i = 1; i <= totalChunks; i++) {
        if (abortController.signal.aborted) {
          throw new Error('Upload aborted');
        }
  
        end = start + CHUNK_SIZE;
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('index', i);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', fieUploadUUID + "_" + file.name);
        formData.append('fileSize', file.size);
        formData.append('type', uploadType);
  
        // Pass the abort signal to the request
        const options = {
          signal: abortController.signal, // Attach the abort signal
        };
  
        await UpdateLessonVideo(formData, options); // Ensure the API call supports abort signal
  
        uploadedChunks++;
        const progress = Math.floor((uploadedChunks / totalChunks) * 100);
        updateProgressCallback(progress);
  
        start = end;
      }
  
      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log('Time elapsed:', timeElapsed, 'seconds');
  
      // After uploadFileInChunks completes, trigger progress to 100%
      updateProgressCallback(100);
  
      // Execute callback function when upload completes
      if (typeof onUploadComplete === 'function') {
        onUploadComplete();
      }
  
    } catch (err) {
      if (err.name === 'AbortError' || err.message === 'Upload aborted') {
        console.log('Upload canceled');
        
      } else {
        console.error('Error uploading file:', err);
        ErrorAlert('Error', 'Error uploading file');
      }
    } finally {
      setUploading(false);
    }
  };