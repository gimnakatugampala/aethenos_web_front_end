// import { UpdateLessonVideo } from "../api";
import { AddCurriculumDownloadable, AddCurriculumSourceCode, BACKEND_LINK } from "../../api";
import ErrorAlert from "../Alerts/ErrorAlert";
import { v4 as uuidv4 } from 'uuid';



export const uploadFileInChunksSourcesCode = async (
  code,
  ID,
  fieUploadUUID,
  uploadType,
  file,
  setsectionData,
  updateProgressBarFiles,
  setisUploadSourceFiles,
  setUploadProgressSFiles
) => {
  if (!file) {
    ErrorAlert("Error", "No file selected.");
    setisUploadSourceFiles(false);
    return;
  }

  setisUploadSourceFiles(true);

  const CHUNK_SIZE = 5 * 1024 * 1024; // Default to 5MB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let uploadedChunks = 0;
  let start = 0,
    end;

  try {
    const startTime = new Date();

    for (let i = 1; i <= totalChunks; i++) {
      end = start + CHUNK_SIZE;
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk); // Current chunk
      formData.append("index", i); // Chunk index
      formData.append("totalChunks", totalChunks); // Total number of chunks
      formData.append("fileName", fieUploadUUID + "_" + file.name); // File name with unique ID
      formData.append("fileSize", file.size); // Original file size
      formData.append("type", uploadType); // Upload type

      // API request for uploading each chunk
      const response = await fetch(`${BACKEND_LINK}/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to upload chunk ${i}/${totalChunks}: ${response.statusText}`
        );
      }

      uploadedChunks++;
      const progress = Math.floor((uploadedChunks / totalChunks) * 100);
      updateProgressBarFiles && updateProgressBarFiles(progress); // Update progress
      console.log(progress);
      setUploadProgressSFiles(progress);

      start = end; // Move to the next chunk
    }

    // Execute after all chunks are uploaded
    // await AddCurriculumDownloadable(
    //   code,
    //   ID,
    //   fieUploadUUID,
    //   file,
    //   setsectionData
    // );
    await AddCurriculumSourceCode(code, ID, fieUploadUUID, file, setsectionData);

    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000;
    console.log("Time elapsed:", timeElapsed, "seconds");
  } catch (err) {
    console.error("Error uploading file:", err);
    setisUploadSourceFiles(false);
    ErrorAlert("Error", "Error uploading file.");
  } finally {
    setisUploadSourceFiles(false);
  }
};