

import multer from "multer";

const storage = multer.memoryStorage();

// Old - only accepts one field
// export const singleUpload = multer({ storage }).single("file");

// New - accepts both 'file' (resume) and 'photo' (avatar)
export const singleUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "photo", maxCount: 1 },
]);