import multer from "multer";
import { json } from "zod";
import path from "path";
import { fileURLToPath } from "url";
// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resumeDir = path.join(__dirname, "..", "..", "resumes");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, resumeDir);
    },
    filename: function (req, file, cb) {
        //@ts-ignore
        const userid = JSON.stringify(req.id);
        const ext = path.extname(file.originalname);
        cb(null, `${userid}${ext}`);
    }
});
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only accept PDFs
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDFs allowed!"));
        }
        cb(null, true);
    },
});
//# sourceMappingURL=file_upload.js.map