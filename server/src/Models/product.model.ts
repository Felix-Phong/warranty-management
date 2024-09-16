import mongoose from 'mongoose';


// Schema cho sản phẩm (Products)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Tên sản phẩm là bắt buộc
    },
    type: {
        type: String,
        enum: ['laptop', 'chuot', 'banphim', 'manhinh', 'ram', 'cpu', 'tainghe'], // Giới hạn các loại sản phẩm
        required: true,
    },
    Supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Tham chiếu đến nhà phân phối (Supplier)
        required: true,
    },
    description: {
        type: String,
    },
    warranty_period: {
        type: Number, // Thời gian bảo hành, tính bằng tháng
        required: true,
    },
    specifications: {
        laptop: {
            cpu: { type: String },
            ram: { type: String },
            storage: { type: String },
            screen_size: { type: String },
            battery_capacity: { type: String },
        },
        chuot: {
            dpi: { type: Number },
            connection_type: { type: String, enum: ['Wired', 'Wireless'] },
        },
        banphim: {
            key_type: { type: String, enum: ['Mechanical', 'Membrane'] },
            connection_type: { type: String, enum: ['Wired', 'Wireless'] },
        },
        manhinh: {
            resolution: { type: String }, // Ví dụ: "1920x1080"
            screen_size: { type: String }, // Ví dụ: "24 inches"
            refresh_rate: { type: Number }, // Ví dụ: 60Hz, 144Hz
        },
        ram: {
            capacity: { type: String }, // Ví dụ: "8GB", "16GB"
            type: { type: String }, // Ví dụ: DDR4, DDR5
        },
        cpu: {
            core_count: { type: Number }, // Số lượng core
            frequency: { type: String }, // Tần số, ví dụ: "3.6 GHz"
        },
        tainghe: {
            connection_type: { type: String, enum: ['Wired', 'Wireless'] },
            noise_cancelling: { type: Boolean }, // Có chống ồn hay không
        }
    }
}, { timestamps: true });

// Tạo model từ schema
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
