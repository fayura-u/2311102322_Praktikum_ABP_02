CREATE DATABASE IF NOT EXISTS inventaris_toko_cokomi_wowo;
USE inventaris_toko_cokomi_wowo;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NULL,
    price DECIMAL(12,2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES
    ('Admin Toko', 'admin@cokomiwowo.test', '$2y$10$abcdefghijklmnopqrstuv1234567890abcdefghijklmnopqrstuv');

INSERT INTO products (name, category, description, price, stock)
VALUES
    ('Beras Premium 5kg', 'Sembako', 'Beras pulen untuk stok harian toko.', 78000, 12),
    ('Minyak Goreng 2L', 'Sembako', 'Minyak goreng kemasan ekonomis.', 36000, 6),
    ('Kopi Sachet', 'Minuman', 'Produk cepat laku di area kasir.', 2500, 45),
    ('Gula Pasir 1kg', 'Sembako', 'Gula pasir kemasan bening.', 17500, 18),
    ('Teh Celup', 'Minuman', 'Isi 25 kantong teh.', 9800, 9);
