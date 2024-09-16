import mongoose from 'mongoose';


// Tạo schema cho đăng ký bảo hành (WarrantyRegistrations)
const warrantyRegistrationSchema = new mongoose.Schema({
    _staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết tới Users
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Liên kết tới Products
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Liên kết tới Customer
        required: true
    },
    received_date: {
        type: Date,
        default: Date.now, // Mặc định là ngày hiện tại
        required: true
    },
    current_status: {
        type: String,
        enum: ['pending_check', 'under_repair', 'returned_to_customer', 'sent_to_manufacturer'], // Danh sách trạng thái có thể có
        required: true
    },
    notes: {
        type: String,
        default: '', // Mặc định là chuỗi trống
    }
}, { timestamps: true });

// Tạo model từ schema
const WarrantyRegistrationModel = mongoose.model('WarrantyRegistration', warrantyRegistrationSchema);

export default WarrantyRegistrationModel;
