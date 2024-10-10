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
// src/types/index.ts
export interface WarrantyRegistration {
    _id?: string; // Optional for new registrations
    product_id: string; // Using the API field names
    customer_id: string;
    received_date: string;
    current_status: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface Order {
    _id: string;
    products: Product[];
    total_cost: number;
    customer_id: string;
    purchase_date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}