const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body; 
        let total = 0;

        for (let item of products) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
            if (product.stock < item.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
            }
            total += product.price * item.quantity;
            
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            userId: req.user._id, 
            products,
            total
        });

        const savedOrder = await order.save();
        res.json({ message: 'Pedido creado con éxito 🎉', order: savedOrder });
    } catch (err) {
        res.status(500).json({ error: 'Error al procesar el pedido' });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Error al recuperar los pedidos' });
    }
};