// import { UpdateLessonVideo } from "../api";
import { AddCurriculumDownloadable, BACKEND_LINK } from "../../api";
import ErrorAlert from "../Alerts/ErrorAlert";
import { v4 as uuidv4 } from 'uuid';


export const uploadFileInChunksCodingExcercise = async (
  code,
  ID,
  fileUploadUUID,
  uploadType,
  file,
  setshowResources,
  setsectionData,
  updateProgressBarFiles,
  setUploading,
  onComplete // Callback for post-upload actions
) => {
  if (!file) {
    ErrorAlert("Error", "No file selected.");
    setUploading(false);
    return;
  }

  setUploading(true);
  const CHUNK_SIZE = 5 * 1024 * 1024; // Default to 5MB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let uploadedChunks = 0;
  let start = 0,
    end;

  try {
    for (let i = 1; i <= totalChunks; i++) {
      end = start + CHUNK_SIZE;
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("index", i);
      formData.append("totalChunks", totalChunks);
      formData.append("fileName", fileUploadUUID + "_" + file.name);
      formData.append("fileSize", file.size);
      formData.append("type", uploadType);

      const response = await fetch(`${BACKEND_LINK}/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload chunk ${i}/${totalChunks}`);
      }

      uploadedChunks++;
      const progress = Math.floor((uploadedChunks / totalChunks) * 100);
      updateProgressBarFiles && updateProgressBarFiles(progress);
      start = end; // Move to next chunk
    }

    // Call onComplete callback if provided
    if (onComplete) {
      await onComplete(fileUploadUUID);
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    ErrorAlert("Error", "Error uploading file.");
  } finally {
    setUploading(false);
  }
};
