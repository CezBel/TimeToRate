import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, 'uploads/');
  },
  filename(req, file, callBack) {
    callBack(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function fileFilter(req, file, callBack) {
  const fileTypes = /jpe?g|webp|png/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = mimeTypes.test(file.mimetype);

  if (extname && mimeType) {
    callBack(null, true);
  } else {
    callBack(new Error('Images only!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file?.path !== undefined) { 
        res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file?.path}` 
      });
    } else {
      res.status(400).json({ message: 'You must choose file' });
    }
  });
});

export default router;