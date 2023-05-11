SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `sku_no` varchar(10) NOT NULL,
    `barcode` varchar(20) NOT NULL,
    `description_1` varchar(20) DEFAULT NULL,
    `description_2` varchar(20) DEFAULT NULL,
    `brand` varchar(20) DEFAULT NULL,
    `brand_sku` varchar(20) DEFAULT NULL,
    `text_1` varchar(80) DEFAULT NULL,
    `text_2` varchar(80) DEFAULT NULL,
    `country` varchar(10) DEFAULT NULL,
    `pic_1` varchar(1023) DEFAULT NULL,
    `pic_2` varchar(1023) DEFAULT NULL,
    `pic_3` varchar(1023) DEFAULT NULL,
    `pic_4` varchar(1023) DEFAULT NULL,
    `video_1` varchar(1023) DEFAULT NULL,
    `video_2` varchar(1023) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `telephone_number` varchar(255) NOT NULL,
    `password` varchar(511) NOT NULL,
    `additional_info` varchar(500) NOT NULL,
    `expiry_date` date NOT NULL,
    `logo` text NOT NULL,
    `level` enum('star1','star2','star3','star4','star5','admin') NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `additional_info`, `expiry_date`, `logo`, `level`, `created_at`, `updated_at`) VALUES
(1,	'admin',	'admin@admin.com',	'5f4dcc3b5aa765d61d8327deb882cf99',	'',	'',	'',	'admin',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00');