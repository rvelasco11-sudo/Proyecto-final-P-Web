const Product = require('../models/Product');
exports.getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json({ message: 'Producto agregado con éxito', product: savedProduct });
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el producto' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el producto' });
    }
};