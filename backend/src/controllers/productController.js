const koiService = require("../services/productService");

const createKoi = async (req, res) => {
    try {
        const koiData = req.body; 
        const koi = await koiService.createKoiService(koiData);
        res.status(201).json(koi); 
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

const getAllKois = async (req, res) => {
    try {
        const kois = await koiService.getAllKois();
        res.status(200).json(kois);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getKoiById = async (req, res) => {
    try {
        const koi = await koiService.getKoiByIdService(req.params.id); 
        if (!koi) {
            return res.status(404).json({ message: 'Koi not found' });
        }
        res.status(200).json(koi); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateKoi = async (req, res) => {
    try {
        const koi = await koiService.updateKoiService(req.params.id, req.body); 
        if (!koi) {
            return res.status(404).json({ message: 'Koi not found' });
        }
        res.status(200).json(koi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteKoi = async (req, res) => {
    try {
        const koi = await koiService.deleteKoiService(req.params.id); 
        if (!koi) {
            return res.status(404).json({ message: 'Koi not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

module.exports = {
    createKoi,
    getAllKois,
    getKoiById,
    updateKoi,
    deleteKoi
};
