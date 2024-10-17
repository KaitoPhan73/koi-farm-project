const Koi = require('../models/Product');

const koiService = {
    createKoi: async (koiData) => {
        const koi = new Koi(koiData);
        return await koi.save();
    },

    getAllKois: async () => {
        return await Koi.find();
    },

    getKoiById: async (id) => {
        return await Koi.findById(id);
    },

    updateKoi: async (id, koiData) => {
        return await Koi.findByIdAndUpdate(id, koiData, { new: true });
    },

    deleteKoi: async (id) => {
        return await Koi.findByIdAndDelete(id);
    }
};

module.exports = koiService;

