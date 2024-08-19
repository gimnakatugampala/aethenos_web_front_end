import React from 'react'
import ErrorAlert from './Alerts/ErrorAlert';
import { UpdateLessonVideo } from '../api';

export const uploadSyllabusVideoChunks = async (fieUploadUUID, file, updateProgressCallback, setUploading, onUploadComplete) => {
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
        end = start + CHUNK_SIZE;
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('index', i);
        formData.append('totalChunks', totalChunks);
        formData.append('fileName', fieUploadUUID + "_" + file.name);
        formData.append('fileSize', file.size);

        await UpdateLessonVideo(formData);

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
      console.error('Error uploading file:', err);
      setUploading(false);
      ErrorAlert('Error', 'Error uploading file');
    } finally {
      setUploading(false);
    }
};


