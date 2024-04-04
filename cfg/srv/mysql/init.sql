-- Create the eezyApp database if it doesn't exist
CREATE DATABASE IF NOT EXISTS eezyApp;

-- Use the eezyApp database
USE eezyApp;

-- Create the metar_decoder_logs table
CREATE TABLE IF NOT EXISTS metar_decoder_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    icao VARCHAR(4),
    errorLog TEXT,
    rawMetar VARCHAR(255),
    decodedMetar TEXT
);

-- Create the user table
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

