const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) =>
{
    //check file type
    if (file.mimetype.startsWith("image"))
    {
        cb(null, true);
    } else
    {
        //rejected files
        cb(
            {
                message: "Unsupported file format",
            },
            false
        );
    }
};
const photoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 5000000 },
});

export default photoUpload