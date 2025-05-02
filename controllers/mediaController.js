const authuploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = `/media/authorised/${req.file.filename}`;
  res.status(200).json({
    message: "File uploaded successfully",
    filePath
  });
};

const unauthuploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = `/media/unauthorised/${req.file.filename}`;
  res.status(200).json({
    message: "File uploaded successfully",
    filePath
  });
};

module.exports = { authuploadImage, unauthuploadImage };