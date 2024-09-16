import mongoose from 'mongoose';

// Tạo schema cho nhà phân phối (Suppliers)
const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    contact_info: {
        phone: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
            required: true, 
        },
        address: {
            type: String,
            required: true, 
        }
    },
}, { timestamps: true });

// Tạo model từ schema
const SupplierModel = mongoose.model('Supplier', supplierSchema);

export default SupplierModel;
