-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 01, 2023 at 01:35 PM
-- Server version: 8.0.34
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vyashya_serverdb`
--
CREATE DATABASE IF NOT EXISTS `serverdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `serverdb`;

-- --------------------------------------------------------

--
-- Table structure for table `backupstatus`
--

CREATE TABLE `backupstatus` (
  `id` int NOT NULL,
  `IP` varchar(45) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `LastUpdate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `id` int NOT NULL,
  `ServerName` varchar(255) DEFAULT NULL,
  `IP` varchar(45) NOT NULL,
  `Drive` varchar(255) DEFAULT NULL,
  `Size` double DEFAULT NULL,
  `SizeFree` double DEFAULT NULL,
  `SizeUsed` double DEFAULT NULL,
  `PercentFree` varchar(255) DEFAULT NULL,
  `TotalMemory` varchar(255) DEFAULT NULL,
  `FreeMemory` varchar(255) DEFAULT NULL,
  `UsedMemory` varchar(255) DEFAULT NULL,
  `OnlineVPS` int DEFAULT NULL,
  `OfflineVPS` int DEFAULT NULL,
  `LastUpdate` varchar(255) DEFAULT NULL,
  `ServerUptime` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Name`, `Email`, `Password`, `isAdmin`, `Company`) VALUES
(1, 'Vyashya Raj', 'vyashya@exabytes.com', '$2b$10$zto345dqMTq308rNrbQkXe.s4uhtWz4ooQldV0/q9XzPD6NSryoTK', 1, 'Exabytes'),
(2, 'David', 'david@exabytes.com', '$2b$10$JNwQUvXh3lcFNWbTPCxIouZkICiSBMQ2eR7I1GQTazWEwczq55Up6', 1, 'Exabytes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `backupstatus`
--
ALTER TABLE `backupstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `backupstatus`
--
ALTER TABLE `backupstatus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
