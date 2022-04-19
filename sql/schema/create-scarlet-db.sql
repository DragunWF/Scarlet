-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema scarlet_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scarlet_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scarlet_db` DEFAULT CHARACTER SET utf8 ;
USE `scarlet_db` ;

-- -----------------------------------------------------
-- Table `scarlet_db`.`guilds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`guilds` (
  `guild_id` BIGINT NOT NULL,
  `guild_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`guild_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scarlet_db`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`channels` (
  `guild_id` BIGINT NOT NULL,
  `channel_id` BIGINT NOT NULL,
  `channel_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`channel_id`),
  INDEX `fk_channels_guilds_idx` (`guild_id` ASC) VISIBLE,
  CONSTRAINT `fk_channels_guilds`
    FOREIGN KEY (`guild_id`)
    REFERENCES `scarlet_db`.`guilds` (`guild_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scarlet_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`users` (
  `author_id` BIGINT NOT NULL,
  `author_tag` VARCHAR(37) NOT NULL,
  PRIMARY KEY (`author_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scarlet_db`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`messages` (
  `message_id` BIGINT NOT NULL,
  `channel_id` BIGINT NOT NULL,
  `guild_id` BIGINT NOT NULL,
  `author_id` BIGINT NOT NULL,
  `message_content` VARCHAR(2000) NOT NULL,
  `date_sent` DATE NOT NULL,
  `time_sent` TIME NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_messages_channels1_idx` (`channel_id` ASC) VISIBLE,
  INDEX `fk_messages_guilds1_idx` (`guild_id` ASC) VISIBLE,
  INDEX `fk_messages_users1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_channels1`
    FOREIGN KEY (`channel_id`)
    REFERENCES `scarlet_db`.`channels` (`channel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_guilds1`
    FOREIGN KEY (`guild_id`)
    REFERENCES `scarlet_db`.`guilds` (`guild_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `scarlet_db`.`users` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scarlet_db`.`deleted_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`deleted_messages` (
  `message_id` BIGINT NOT NULL,
  `guild_id` BIGINT NOT NULL,
  `channel_id` BIGINT NOT NULL,
  `author_id` BIGINT NOT NULL,
  `message_content` VARCHAR(2000) NOT NULL,
  `date_deleted` DATE NOT NULL,
  `time_deleted` TIME NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_deleted_messages_guilds1_idx` (`guild_id` ASC) VISIBLE,
  INDEX `fk_deleted_messages_channels1_idx` (`channel_id` ASC) VISIBLE,
  INDEX `fk_deleted_messages_users1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_deleted_messages_guilds1`
    FOREIGN KEY (`guild_id`)
    REFERENCES `scarlet_db`.`guilds` (`guild_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_deleted_messages_channels1`
    FOREIGN KEY (`channel_id`)
    REFERENCES `scarlet_db`.`channels` (`channel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_deleted_messages_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `scarlet_db`.`users` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scarlet_db`.`edited_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scarlet_db`.`edited_messages` (
  `message_id` BIGINT NOT NULL,
  `guild_id` BIGINT NOT NULL,
  `channel_id` BIGINT NOT NULL,
  `author_id` BIGINT NOT NULL,
  `before_edit_content` VARCHAR(2000) NOT NULL,
  `after_edit_content` VARCHAR(2000) NOT NULL,
  `date_edited` DATE NOT NULL,
  `time_edited` TIME NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_edited_messages_guilds1_idx` (`guild_id` ASC) VISIBLE,
  INDEX `fk_edited_messages_channels1_idx` (`channel_id` ASC) VISIBLE,
  INDEX `fk_edited_messages_users1_idx` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_edited_messages_guilds1`
    FOREIGN KEY (`guild_id`)
    REFERENCES `scarlet_db`.`guilds` (`guild_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_edited_messages_channels1`
    FOREIGN KEY (`channel_id`)
    REFERENCES `scarlet_db`.`channels` (`channel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_edited_messages_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `scarlet_db`.`users` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
