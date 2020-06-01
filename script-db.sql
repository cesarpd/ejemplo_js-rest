-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: alumnos
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `curso_UN` (`nombre`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Java','default.png',100),(2,'JavaScript','default.png',45),(3,'Html y css','default.png',20);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `avatar` varchar(250) NOT NULL DEFAULT 'avatar1.png',
  `sexo` varchar(1) NOT NULL DEFAULT 'h',
  PRIMARY KEY (`id`),
  UNIQUE KEY `persona_UN` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (11,'LuisaMarias','img/avatar2.png','m'),(12,'Maria2','img/avatar2.png','m'),(13,'Pedro','img/avatar2.png','m'),(14,'Nuevoz','img/avatar5.png','h'),(15,'Pepe','img/avatar4.png','m'),(18,'eltio','img/avatar2.png','m'),(19,'Fulanito tito','img/avatar9.png','m'),(30,'Pepe2','img/avatar1.png','h'),(55,'sin nombre','img/avatar1.png','h'),(56,'teste','img/avatar1.png','m'),(57,'Soy mujer','img/avatar9.png','m'),(58,'Soy hombre','img/avatar10.png','m'),(61,'sin nombre2','img/avatar1.png','h'),(71,'TF','img/avatar7.png','h'),(74,'Nuevo Nuevez','img/avatar6.png','h');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona_has_curso`
--

DROP TABLE IF EXISTS `persona_has_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona_has_curso` (
  `persona_id` int NOT NULL,
  `curso_id` int NOT NULL,
  PRIMARY KEY (`persona_id`,`curso_id`),
  KEY `persona_has_curso_FK_1` (`curso_id`),
  CONSTRAINT `persona_has_curso_FK` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`),
  CONSTRAINT `persona_has_curso_FK_1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona_has_curso`
--

LOCK TABLES `persona_has_curso` WRITE;
/*!40000 ALTER TABLE `persona_has_curso` DISABLE KEYS */;
INSERT INTO `persona_has_curso` VALUES (12,1),(13,1),(15,1),(18,1),(19,1),(30,1),(55,1),(56,1),(57,1),(58,1),(61,1),(71,1),(74,1),(11,2),(12,2),(18,2),(19,2),(30,2),(55,2),(56,2),(57,2),(58,2),(61,2),(71,2),(74,2),(14,3),(15,3),(18,3),(19,3),(30,3),(56,3),(57,3),(61,3),(71,3);
/*!40000 ALTER TABLE `persona_has_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'avatar1.png',
  `sexo` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'h',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (72,'profe1','img/avatar7.png','h'),(73,'profe2','img/avatar5.png','h'),(74,'profe3','img/avatar9.png','m'),(78,'Profesora','img/avatar1.png','m');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_has_curso`
--

DROP TABLE IF EXISTS `profesor_has_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_has_curso` (
  `curso_id` int NOT NULL,
  `profesor_id` int NOT NULL,
  PRIMARY KEY (`curso_id`,`profesor_id`),
  UNIQUE KEY `curso_id_UNIQUE` (`curso_id`),
  UNIQUE KEY `profesor_id_UNIQUE` (`profesor_id`),
  KEY `fk_profesor_has_curso_curso1_idx` (`curso_id`),
  KEY `fk_profesor_has_curso_profesor1_idx` (`profesor_id`),
  CONSTRAINT `fk_profesor_has_curso_curso1` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id`),
  CONSTRAINT `fk_profesor_has_curso_profesor1` FOREIGN KEY (`profesor_id`) REFERENCES `profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_has_curso`
--

LOCK TABLES `profesor_has_curso` WRITE;
/*!40000 ALTER TABLE `profesor_has_curso` DISABLE KEYS */;
INSERT INTO `profesor_has_curso` VALUES (1,72);
/*!40000 ALTER TABLE `profesor_has_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'alumnos'
--

--
-- Dumping routines for database 'alumnos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-01 12:19:28
