import mongoose from 'mongoose';


// Tạo schema cho khách hàng (Customer)
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Tên khách hàng là bắt buộc
    },
    contact_info: {
        phone: {
            type: String,
            required: true, // Số điện thoại là bắt buộc
        },
        email: {
            type: String,
            required: true, // Email là bắt buộc
        },
        address: {
            type: String,
            required: true, // Địa chỉ là bắt buộc
        }
    }
}, { timestamps: true }); // Tùy chọn timestamps để tự động quản lý thời gian

// Tạo model từ schema
const CustomerModel = mongoose.model('Customer', customerSchema);

export default CustomerModel;
