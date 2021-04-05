class FileController {
  async store(req, res) {
    const { filename: file } = req.file;

    return res.json(req.file);
  }
}

export default new FileController();
