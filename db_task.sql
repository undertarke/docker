-- -------------------------------------------------------------
-- TablePlus 5.1.0(468)
--
-- https://tableplus.com/
--
-- Database: db_task
-- Generation Time: 2022-12-09 11:37:08.7870
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `cong_viec` (
  `ma_cong_viec` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `id_nguoi_tao` int DEFAULT NULL,
  `ma_trang_thai` int DEFAULT NULL,
  `is_remove` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_cong_viec`),
  KEY `id_nguoi_tao` (`id_nguoi_tao`),
  KEY `ma_trang_thai` (`ma_trang_thai`),
  CONSTRAINT `cong_viec_ibfk_1` FOREIGN KEY (`id_nguoi_tao`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `cong_viec_ibfk_2` FOREIGN KEY (`ma_trang_thai`) REFERENCES `trang_thai` (`ma_trang_thai`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `hinh_dai_dien` varchar(255) DEFAULT NULL,
  `is_remove` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `trang_thai` (
  `ma_trang_thai` int NOT NULL AUTO_INCREMENT,
  `ten_trang_thai` varchar(255) DEFAULT NULL,
  `is_remove` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_trang_thai`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cong_viec` (`ma_cong_viec`, `ten_cong_viec`, `ngay_tao`, `mo_ta`, `id_nguoi_tao`, `ma_trang_thai`, `is_remove`) VALUES
(1, 'Làm template chúc mừng', '2022-12-12', 'đây là mô tả', 1, 1, 0),
(2, 'Hệ thống quản lý', '2022-12-12', 'đây là mô tả', 2, 3, 0),
(3, 'Phân tích API', '2022-12-12', 'đây là mô tả', 3, 3, 0),
(4, 'Viết API', '2022-12-12', 'đây là mô tả', 3, 1, 0),
(5, 'Code wordpress', '2022-12-12', 'đây là mô tả', 4, 2, 0),
(6, 'Ngồi chơi', '2022-12-12', 'đây là mô tả', 5, 2, 0),
(7, 'Gym time', '2022-12-12', 'đây là mô tả', 5, 1, 0);

INSERT INTO `nguoi_dung` (`id`, `ho_ten`, `email`, `mat_khau`, `ngay_sinh`, `hinh_dai_dien`, `is_remove`) VALUES
(1, 'Thor', 'thor@gmail.com', '1234', '2022-05-05', NULL, 0),
(2, 'Loki', 'loki@gmail.com', '1234', '2022-05-05', NULL, 0),
(3, 'Stark', 'stark@gmail.com', '1234', '2022-05-05', NULL, 0),
(4, 'John Cena', 'johncena@gmail.com', '1234', '2022-05-05', NULL, 0),
(5, 'The Rock', 'therock@gmail.com', '1234', '2022-05-05', NULL, 0);

INSERT INTO `trang_thai` (`ma_trang_thai`, `ten_trang_thai`, `is_remove`) VALUES
(1, 'To Do', 0),
(2, 'Progress', 0),
(3, 'Done', 0);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;