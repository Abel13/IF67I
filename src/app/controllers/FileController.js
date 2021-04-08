class FileController {
  async store(req, res) {
    const { filename } = req.file;
    if (filename) {
      console.log("ok");
      return res.json({ url: "http://localhost:3333/files/" + filename });
    } else {
      console.log("error");
      res.error(400).json({ message: "Falha ao salvar a imagem!" });
    }
  }
}

export default new FileController();
