-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 19, 2019 at 04:58 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `beanworks`
--

-- --------------------------------------------------------

--
-- Table structure for table `Accounts`
--

CREATE TABLE `Accounts` (
  `id` int(11) NOT NULL,
  `AccountID` varchar(255) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `UpdatedDateUTC` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `SyncLogs`
--

CREATE TABLE `SyncLogs` (
  `id` int(11) NOT NULL,
  `Parent` int(11) NOT NULL DEFAULT '0',
  `SyncDataType` varchar(255) DEFAULT NULL,
  `SyncType` varchar(255) DEFAULT NULL,
  `SyncBy` varchar(100) NOT NULL DEFAULT 'Brijal Savaliya',
  `SyncOn` datetime DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Vendors`
--

CREATE TABLE `Vendors` (
  `id` int(11) NOT NULL,
  `ContactID` varchar(255) NOT NULL,
  `AccountNumber` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ContactStatus` varchar(100) NOT NULL,
  `UpdatedDateUTC` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Accounts`
--
ALTER TABLE `Accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SyncLogs`
--
ALTER TABLE `SyncLogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Vendors`
--
ALTER TABLE `Vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Accounts`
--
ALTER TABLE `Accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SyncLogs`
--
ALTER TABLE `SyncLogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Vendors`
--
ALTER TABLE `Vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
