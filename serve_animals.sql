-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 09:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serve_animals`
--

-- --------------------------------------------------------

--
-- Table structure for table `limited`
--

CREATE TABLE `limited` (
  `Id_limited` int(11) NOT NULL,
  `Date_L` varchar(10) NOT NULL,
  `Limited_day` int(11) NOT NULL,
  `Service` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `limited`
--

INSERT INTO `limited` (`Id_limited`, `Date_L`, `Limited_day`, `Service`) VALUES
(4, 'everyDay', 5, 1),
(5, 'everyDay', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `User_id` int(10) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `PhoneNum` varchar(10) NOT NULL,
  `Birthday` date NOT NULL,
  `Profile_pic` varchar(100) NOT NULL,
  `IDcard_pic` varchar(100) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`User_id`, `Name`, `Address`, `PhoneNum`, `Birthday`, `Profile_pic`, `IDcard_pic`, `Email`, `Password`, `Role`) VALUES
(18, 'admin', '', '', '0000-00-00', '', '', 'admin', '1234', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `Payment_id` int(11) NOT NULL,
  `Reserve_id` int(11) NOT NULL,
  `Deposit_f` tinyint(1) NOT NULL,
  `Deposit` int(11) NOT NULL,
  `Deposit_p` varchar(100) NOT NULL,
  `Money_perDay` int(11) NOT NULL,
  `Payment_f` tinyint(1) NOT NULL,
  `Receipt` varchar(100) NOT NULL,
  `Status_pay` int(11) NOT NULL,
  `Total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `Pet_id` int(10) NOT NULL,
  `User_id` int(10) NOT NULL,
  `Name_pet` varchar(30) NOT NULL,
  `Size` varchar(10) NOT NULL,
  `Types` varchar(10) NOT NULL,
  `Breeds` varchar(20) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Hair` varchar(10) NOT NULL,
  `Vaccine` int(2) NOT NULL,
  `Vaccine_date` date NOT NULL,
  `Disease` varchar(30) NOT NULL,
  `Detail_P` varchar(30) NOT NULL,
  `Status_p` tinyint(1) NOT NULL,
  `Image_p` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_health`
--

CREATE TABLE `pet_health` (
  `Health_id` int(10) NOT NULL,
  `Pet_id` int(10) NOT NULL,
  `Question_1` int(1) NOT NULL,
  `Question_2` int(1) NOT NULL,
  `Question_3` int(1) NOT NULL,
  `Question_4` int(1) NOT NULL,
  `Result_score` decimal(5,2) NOT NULL,
  `Date_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `Price_id` int(11) NOT NULL,
  `Size_pet` varchar(10) NOT NULL,
  `Price` int(11) NOT NULL,
  `Type_pet` varchar(20) NOT NULL,
  `Hair_pet` varchar(10) NOT NULL,
  `Service` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `price`
--

INSERT INTO `price` (`Price_id`, `Size_pet`, `Price`, `Type_pet`, `Hair_pet`, `Service`) VALUES
(1, '1-11 kg', 500, 'แมว', '-', 0),
(2, '12-20 kg', 250, 'แมว', '-', 0),
(3, '20+ kg', 250, 'แมว', '-', 0),
(4, '1-11 kg', 250, 'อื่นๆ', '-', 0),
(5, '12-20 kg', 350, 'อื่นๆ', '-', 0),
(6, '20+ kg', 350, 'อื่นๆ', '-', 0),
(7, '', 50, 'ค่าอาหาร', '-', 0),
(8, '1-11 kg', 250, 'แมว', 'ไม่มีขน', 1),
(9, '12-20 kg', 250, 'แมว', 'ไม่มีขน', 1),
(10, '20+ kg', 250, 'แมว', 'ไม่มีขน', 1),
(11, '1-11 kg', 350, 'แมว', 'ขนยาว', 1),
(12, '12-20 kg', 350, 'แมว', 'ขนยาว', 1),
(13, '20+ kg', 350, 'แมว', 'ขนยาว', 1),
(14, '1-11 kg', 250, 'แมว', 'ขนสั้น', 1),
(15, '12-20 kg', 250, 'แมว', 'ขนสั้น', 1),
(16, '20+ kg', 250, 'แมว', 'ขนสั้น', 1),
(17, '1-11 kg', 250, 'อื่นๆ', 'อื่นๆ', 1),
(18, '12-20 kg', 350, 'อื่นๆ', 'อื่นๆ', 1),
(19, '20+ kg', 450, 'อื่นๆ', 'อื่นๆ', 1),
(23, '', 120, 'ค่ามัดจำ', '', 0),
(24, '1-11 kg', 250, 'สุนัข', 'ไม่มีขน', 1),
(25, '12-20 kg', 350, 'สุนัข', 'ไม่มีขน', 1),
(26, '20+ kg', 450, 'สุนัข', 'ไม่มีขน', 1),
(27, '1-11 kg', 250, 'สุนัข', 'ขนสั้น', 1),
(28, '12-20 kg', 350, 'สุนัข', 'ขนสั้น', 1),
(29, '20+ kg', 450, 'สุนัข', 'ขนสั้น', 1),
(30, '1-11 kg', 250, 'สุนัข', 'ขนยาว', 1),
(31, '12-20 kg', 350, 'สุนัข', 'ขนยาว', 1),
(32, '20+ kg', 450, 'สุนัข', 'ขนยาว', 1),
(33, '1-11 kg', 250, 'สุนัข', '-', 0),
(34, '12-20 kg', 350, 'สุนัข', '-', 0),
(35, '20+ kg', 350, 'สุนัข', '-', 0);

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `Refund_id` int(11) NOT NULL,
  `Reserve_id` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Payment_f` tinyint(1) NOT NULL,
  `Receipt` varchar(100) NOT NULL,
  `Description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reserve`
--

CREATE TABLE `reserve` (
  `Reserve_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Pet_id` int(11) NOT NULL,
  `Service` tinyint(1) NOT NULL,
  `Period` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` varchar(5) NOT NULL,
  `Food` tinyint(1) NOT NULL,
  `Tick` tinyint(1) NOT NULL,
  `CarryOn` varchar(50) NOT NULL,
  `Detail` varchar(50) NOT NULL,
  `Feedback` text NOT NULL,
  `Status` int(11) NOT NULL,
  `Date_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `limited`
--
ALTER TABLE `limited`
  ADD PRIMARY KEY (`Id_limited`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`User_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Payment_id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`Pet_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Indexes for table `pet_health`
--
ALTER TABLE `pet_health`
  ADD PRIMARY KEY (`Health_id`),
  ADD KEY `Pet_id` (`Pet_id`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`Price_id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`Refund_id`);

--
-- Indexes for table `reserve`
--
ALTER TABLE `reserve`
  ADD PRIMARY KEY (`Reserve_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `limited`
--
ALTER TABLE `limited`
  MODIFY `Id_limited` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `User_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `Payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `Pet_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `pet_health`
--
ALTER TABLE `pet_health`
  MODIFY `Health_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `price`
--
ALTER TABLE `price`
  MODIFY `Price_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `Refund_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `reserve`
--
ALTER TABLE `reserve`
  MODIFY `Reserve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pet_health`
--
ALTER TABLE `pet_health`
  ADD CONSTRAINT `pet_health_ibfk_1` FOREIGN KEY (`Pet_id`) REFERENCES `pets` (`Pet_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
