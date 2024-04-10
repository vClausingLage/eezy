-- Create the eezyApp database if it doesn't exist
CREATE DATABASE IF NOT EXISTS eezyApp;

-- Use the eezyApp database
USE eezyApp;

-- Create the metar_decoder_logs table
CREATE TABLE IF NOT EXISTS metar_decoder_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    icao VARCHAR(4),
    error_log VARCHAR(255),
    raw_metar VARCHAR(255),
    decoded_metar TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the user table
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

