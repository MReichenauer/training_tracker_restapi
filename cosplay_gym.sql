-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2024 at 01:16 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cosplay_gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `weight` double NOT NULL,
  `exercise` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reps` int(11) NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`id`, `date`, `weight`, `exercise`, `reps`, `userId`) VALUES
(6, '2024-04-12', 12, 'Bench', 11, 18),
(16, '2024-04-16', 2, 'SONJABÄNK', 3, 18),
(19, '2024-04-17', 2, 'liiilllyeas', 3, 18),
(20, '2024-04-18', 22, 'Yeah', 4, 40),
(22, '2024-04-17', 22, 'Giiirlysas', 32, 18),
(24, '2024-04-18', 22, 'min mamma!', 3, 18),
(47, '2024-04-14', 130, 'Marklyft', 1, 17),
(48, '2024-04-15', 1337, 'Ringtelia', 1, 17),
(51, '2024-04-19', 22, 'SONJABÄNK2', 311, 17),
(52, '2024-04-14', 23, 'frez', 11, 17),
(57, '2024-04-04', 31, 'Squatet', 441, 17);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `height`, `weight`, `firstName`, `lastName`) VALUES
(16, 'Sonjastsss@example.com', '$2b$10$XTgwwUQ0EQNCFGH.uX0o7ekNgc0dRJAwRhFu8H2ahAGQT3GjKYyp2', 169, 55, 'Sonja', 'Tyson'),
(17, 'max@gmail.com', '$2b$10$V92Px1M6uQxK1znJXdy.jedZq9KifjzXK7s.L0dFvUFoM0gPh1pVG', 33, 13, 'Max', 'Reichenauer'),
(18, 'sonja@gmail.com', '$2b$10$jyVlfOrddrLS6psn.loMruBvWyCRv9KETguAkLl.oLsitAxnhNPtu', 90, 9, 'Sonja', 'Lindqvist Reichenauer'),
(19, 'sonja1337@gmail.com', '$2b$10$aeTCojb/AX3LNaP5mtNK5eyyJqK.ZzKw5bQH.vgi37TFessKzZERW', 90, 13, 'Lill', 'Seee'),
(20, 'mickemouse@hotmail.com', '$2b$10$uIwFmq49NIx5LIhR9Eh8Pu9sDyjnLX/WVbHmy3L9Vcvk4YgCp8ZJy', 41, 14, 'Micke', 'mouse'),
(21, 'hungrig@gmail.com', '$2b$10$PM8qhaOX4hUIE4ZaFEGJ9umFprXtYXmndq/DlWJK4WS3xLamjt00u', 37, 13, 'mat', 'nuuu'),
(22, 'mattmad@gmail.com', '$2b$10$zFZtZdkdUb9a.h/y/mQZUOXfxiwvVhui1Eva6Ff0/vT0ZqzuJrK4.', 33, 87, 'vila', 'nuuu'),
(23, 'prov@gmail.com', '$2b$10$PGTHFNxb9/lELYKibxW7SuNOOpH6DsC/7d8exYfD234X/R/ce75pu', 222, 22, 'prov', 'prova'),
(24, 'proev@gmail.com', '$2b$10$9conoyh9drZaFeXEGoWMD.hSEYey.toVKCVFV7YeCRl5s13bwPUhG', 222, 22, 'prov', 'prova'),
(25, 'proesv@gmail.com', '$2b$10$BxO0olIixnJDo9h1h/G6AeAOEpJXSH/Is7wkYxtiSTtlGQa4e1w1q', 222, 22, 'prov', 'prova'),
(26, 'prova2@gmai.com', '$2b$10$u8R/Wiqg4q9kSCDFiHvCxO497ZV3/SsUnhoS4V/Q0U6g//CRXS3QO', 44, 12, 'maxnen', 'lwkasjd'),
(27, 'max.reichenau22er98@gmail.com', '$2b$10$NJtCoDXkFrq95.MAU4cjseVxAS/VmjYz5QMK95mlW.WxdPYaLbOIe', 444, 22, 'Max', 'Reichenauer'),
(28, 'maxen@gmail.com', '$2b$10$tcnXGvLcbhthAKVfKIx3UumTP.ct.RiCXRYlRvetpIp5P2PcyPxWG', 2, 22, 'ma2', 'nils'),
(29, 'max.reichen2auer98@gmail.com', '$2b$10$C5j/FDC9KExvT1z0hUa9uOTHIo05X2lX15WdCHiWZFdCI96lN6F8C', 33, 2, 'Max', 'Reichenauer'),
(30, 'max.reichenss2auer98@gmail.com', '$2b$10$moLd52flS5/XsgWUQt8/dO6HdkAGImJxfadIzwyucBRcdk8P9/uiK', 4, 22, 'Max', 'Reichenauer'),
(31, 'max.reich33enss2auer98@gmail.com', '$2b$10$YMvTjSRAGDtVParEH7wek.kXaj1XFbTBBpCDGleRHjNs2Fgh3ZL1O', 4, 22, 'Max', 'Reichenauer'),
(32, 'max.reichenauer98@gmail.com', '$2b$10$oMN.D5Lvk24HiilJVm/U7.1gk3SAbpdmm1uRHJRGYlsLA9pKtN/ha', 4, 22, 'Max', 'Reichenauer'),
(33, 'max.reich151515enauer98@gmail.com', '$2b$10$4nvrgoPgh2qq8FCND8.YLOonJ/tfNmDv4yBaYLkFtgGQEU7peyYGW', 2, 2, 'Max', 'Reichenauer'),
(34, 'max.reichenau544er98@gmail.com', '$2b$10$yymMdy.otYRvjcXX/1lhhO8QQ3gW9z/aJ6KURVNt6sMhIOA.ntnH2', 44, 12, 'Max', 'Reichenauer'),
(35, 'valentine@hotmail.com', '$2b$10$VjSGzfkBSuz79sIPE1/xIujy/5VBzqrHD6L30/UnlttqfBsVbZ39y', 155, 55, 'Valle', 'Wihoo'),
(36, 'max.reichenauer9899@gmail.com', '$2b$10$LI8yaX6XjYXbm1II30DuROdsAiofUgdwMPk63JiLbYUlkTQ.kXCcW', 847, 33, 'Max', 'Reichenauer'),
(37, 'max.reichena151515uer98@gmail.com', '$2b$10$r/oAK3AouYCe3xozwtMbAuvhthpP4xsBh7hKyVXoKJo0zcOhzeiE2', 2, 22, 'Max', 'Reichenauer'),
(38, 'max.reichenau5445er98@gmail.com', '$2b$10$TvuwpAOZcC1yfPy3Rai6Webhoo0R1AoyAinFoeggYYoHkwOY/Q.gi', 1, 2, 'Max', 'Reichenauer'),
(39, 'karin13@gmail.com', '$2b$10$2M4Jiev.Dxk8huetXMwJSeMEh9r0DUryS3u6yKpmuIhTN0FeL66VW', 41, 23, 'karin', 'secret'),
(40, 'valle@hotmail.com', '$2b$10$V21YbEB2VSZmAJKpEAQXveRLzjWXl7MjuY98VPqlW0zD22k/MG0G2', 31, 22, 'valle', 'balle'),
(41, 'nymax@gmail.com', '$2b$10$0pbGS4DXVJi6f5lnOC02qOyEhP/rBOx7/bNhptz79FPNiyjiFNHzG', 172, 72, 'Nymax', 'nils');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('38d74fe2-28f7-42d4-b959-8d0ece82eca5', 'd5ed2f4f73f0822cb288373390ac937362450705652b66ddeccb9ee49a2a2c45', '2024-04-03 14:37:41.398', '20240403143741_dataen', NULL, NULL, '2024-04-03 14:37:41.328', 1),
('3ea968c7-06c0-4d9f-b263-5681cce1fba0', '9ba67d3fbbe6f8d90f3bc9dab4ed6dda7e2cd12ccc48d1f3dbe038c6e1787a64', '2024-04-03 10:22:29.688', '20240209090846_initial', NULL, NULL, '2024-04-03 10:22:29.372', 1),
('3ef8ec96-f826-466d-b461-f2095851df0a', '923a07dcced84fcf62f299e4e64b1c36032c99b1171122b3516dac85e78dd6b6', '2024-04-03 10:59:40.714', '20240403105940_updated_user', NULL, NULL, '2024-04-03 10:59:40.476', 1),
('7c7d4bf2-2fd9-4fb0-99c8-5809c6ac393f', 'b11567f919ed428e6b8fd10231c04ca471c3e4cc7852db3cec7f76652bbc1a76', '2024-04-17 13:12:27.108', '20240417131227_deploy', NULL, NULL, '2024-04-17 13:12:27.090', 1),
('9a2327f0-91b8-438c-881f-1cdfde59c7eb', '48e17c9a11235e98161ed8431897c958b3147f2165950cff03c317e8514ffabd', '2024-04-03 14:36:23.434', '20240403143610_date', NULL, NULL, '2024-04-03 14:36:23.342', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Progress_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
