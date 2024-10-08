// src/types.ts

export interface ProductSpecifications {
    laptop?: {
        cpu: string;
        ram: string;
        storage: string;
        screen_size: string;
        battery_capacity: string;
    };
    chuot?: {
        dpi: number;
        connection_type: string;
    };
    tainghe?: {
        connection_type: string;
        noise_cancelling: boolean;
    };
}

export interface Product {
    _id: string; // The product ID
    name: string; // The product name
    type: string; // The product type
    Supplier_id: string; // The ID of the supplier
    description: string; // A description of the product
    warranty_period: number; // The warranty period in months
    specifications: ProductSpecifications; // The specifications of the product
    createdAt: string; // Creation timestamp
    updatedAt: string; // Update timestamp
    __v: number; // Version key for MongoDB
}
