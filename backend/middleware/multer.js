import multer from "multer";

const storage = multer.memoryStorage();

// Single file upload (for backward compatibility)
export const singleUpload = multer({ storage }).single("file");

// Multiple file upload for profile (profilePhoto and resume)
export const multiUpload = multer({ storage }).fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);
