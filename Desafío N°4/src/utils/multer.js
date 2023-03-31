import multer from "multer";
import { resolve } from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resolve("src/public/img"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const uploader = multer({storage});

export default uploader;
