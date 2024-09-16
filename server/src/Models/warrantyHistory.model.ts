import mongoose from 'mongoose';


// Tạo schema cho lịch sử bảo hành (WarrantyHistory)
const warrantyHistorySchema = new mongoose.Schema({
    registration_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WarrantyRegistration', // Liên kết tới WarrantyRegistrations
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Liên kết tới Products
        required: true
    },
    technician_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết tới Users (Kỹ thuật viên)
        required: true
    },
    status_changes: [
        {
            status: {
                type: String,
                enum: ['processed', 'not_processed'], // Trạng thái có thể có
                required: true
            },
            actions_taken: [
                {
                    type: String
                }
            ],
            changed_by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Liên kết tới User (nhanvien_tiepnhan hoặc nhanvien_kiemtra)
                required: true
            },
            date: {
                type: Date,
                default: Date.now, // Mặc định là ngày hiện tại
                required: true
            },
            notes: {
                type: String
            }
        }
    ]
}, { timestamps: true });

// Tạo model từ schema
const WarrantyHistoryModel = mongoose.model('WarrantyHistory', warrantyHistorySchema);

export default WarrantyHistoryModel;
