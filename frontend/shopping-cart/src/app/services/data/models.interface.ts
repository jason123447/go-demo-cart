export interface Product {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    img?: string;
}

export interface Order {
    id?: number;
    user_id?: number;
    status?: string;
    total?: number;
    order_items?: OrderItem[]
}

export interface OrderItem {
    id?: number;
    order_id?: number;
    product_id?: number;
    quantity?: number;
    price?: number;
}

export interface User {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    jwtToken?: string;
    // password_hash
}