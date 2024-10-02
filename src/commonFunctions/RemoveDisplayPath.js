import React from 'react';

// Utility function to remove the path and return only the filename
const getFilename = (filePath) => {
  return filePath.split('/').pop();
};

const RemoveDisplayPath = (filePath) => {
  const fileName = getFilename(filePath);
  return fileName
}

export default RemoveDisplayPath;
