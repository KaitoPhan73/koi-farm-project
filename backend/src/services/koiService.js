// services/koiService.js
const Koi = require("../models/Koi");

class KoiService {
  async createKoi(data) {
    const koi = new Koi(data);
    return await koi.save();
  }

  async getKois() {
    return await Koi.find();
  }

  async getPagination(page = 1, limit = 10) {
    const kois = await Koi.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Koi.countDocuments();
    return { kois, total, page, limit };
  }

  async getKoiById(id) {
    return await Koi.findById(id);
  }

  async updateKoi(id, data) {
    return await Koi.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteKoi(id) {
    return await Koi.findByIdAndDelete(id);
  }
}

module.exports = new KoiService();
