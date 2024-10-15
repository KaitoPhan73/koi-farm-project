// controllers/koiController.js
const koiService = require("../services/koiService");

class KoiController {
  async create(req, res) {
    try {
      const koi = await koiService.createKoi(req.body);
      res.status(201).json(koi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const kois = await koiService.getKois();
      res.status(200).json(kois);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPagination(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
      const result = await koiService.getPagination(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const koi = await koiService.getKoiById(req.params.id);
      if (!koi) return res.status(404).json({ message: "Koi not found" });
      res.status(200).json(koi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedKoi = await koiService.updateKoi(req.params.id, req.body);
      if (!updatedKoi)
        return res.status(404).json({ message: "Koi not found" });
      res.status(200).json(updatedKoi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedKoi = await koiService.deleteKoi(req.params.id);
      if (!deletedKoi)
        return res.status(404).json({ message: "Koi not found" });
      res.status(200).json({ message: "Koi deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new KoiController();
