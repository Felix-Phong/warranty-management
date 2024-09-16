import mongoose from 'mongoose';


// Tạo schema cho đơn hàng (Orders)
const orderSchema = new mongoose.Schema({
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Liên kết tới Products
                required: true
            },
            quantity: {
                type: Number,
                required: true, // Số lượng sản phẩm là bắt buộc
                min: 1 // Đảm bảo số lượng ít nhất là 1
            }
        }
    ],
    purchase_date: {
        type: Date,
        default: Date.now, // Mặc định là ngày hiện tại
        required: true
    },
    total_cost: {
        type: Number,
        required: true // Tổng chi phí của đơn hàng là bắt buộc
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Liên kết tới Customer
        required: true
    }
}, { timestamps: true });

// Tạo model từ schema
const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
