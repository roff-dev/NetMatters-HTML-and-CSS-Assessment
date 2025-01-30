-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 30, 2025 at 01:53 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kieronoates_netmatters`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `marketing_consent` tinyint(1) DEFAULT '0',
  `submission_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `name`, `company`, `email`, `phone`, `message`, `marketing_consent`, `submission_date`) VALUES
(1, 'Kieron Oates', 'Real Company', 'test@email.com', '07123456789', 'this is a test message', 0, '2024-12-18 11:20:46');


-- --------------------------------------------------------

--
-- Table structure for table `news_articles`
--

CREATE TABLE `news_articles` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bodyText` text COLLATE utf8mb4_general_ci,
  `author` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `authorImg` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `authorDate` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_articles`
--

INSERT INTO `news_articles` (`id`, `title`, `img`, `category`, `bodyText`, `author`, `authorImg`, `authorDate`) VALUES
(1, 'Trainee IT Technician', 'img/hire1.jpeg', 'Career', 'Salary Range £25,000 -£26,000. Potential OTE at £6k-£8k Hours 40 hours per week, Monday - Friday', 'Bethany Shakespeare', 'img/bethany.jpeg', '16th September 2024'),
(2, 'Mark Reilly - Netmatters 5 Years', 'img/hire2.png', 'News', 'Mark Reilly - Netmatters 5 year legend today, we celebrate the brilliant accomplishments of Mark Reilly', 'Netmatters', 'img/logo-small.png', '16th September 2024'),
(3, 'Telemarketer', 'img/hire.png', 'Career', 'Salary Range £25,000 -£26,000. Potential OTE at £6k-£8k Hours 40 hours per week, Monday - Friday', 'Rebecca Moore', 'img/rebecca.jpeg', '12th September 2024');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_articles`
--
ALTER TABLE `news_articles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news_articles`
--
ALTER TABLE `news_articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
