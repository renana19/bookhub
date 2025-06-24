CREATE DATABASE  IF NOT EXISTS `bookhub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookhub`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bookhub
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `genre` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `coverImageUrl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `published_year` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Harry Potter and the Sorcerer\'s Stone','J.K. Rowling','Fantasy','The first adventure of Harry Potter at Hogwarts.',NULL,1997),(2,'The Lion, the Witch and the Wardrobe','C.S. Lewis','Fantasy','Four children discover a magical land called Narnia.',NULL,1950),(3,'Sherlock Holmes: The Adventures','Arthur Conan Doyle','Mystery','Classic detective stories featuring Sherlock Holmes.',NULL,1892),(4,'The Secret of the Screaming Staircase','Jonathan Stroud','Mystery','Young ghost hunters face dangerous spirits.',NULL,2013),(5,'The Hobbit','J.R.R. Tolkien','Fantasy','Bilbo Baggins embarks on an unexpected journey.',NULL,1937),(6,'Percy Jackson and the Olympians: The Lightning Thief','Rick Riordan','Fantasy','Percy discovers he is a demigod and faces mythical challenges.',NULL,2005),(7,'Eragon','Christopher Paolini','Fantasy','A young farm boy discovers a dragon egg and his destiny.',NULL,2002),(8,'Artemis Fowl','Eoin Colfer','Fantasy','A teenage genius embarks on criminal adventures involving fairies.',NULL,2001),(9,'The Golden Compass','Philip Pullman','Fantasy','A girl sets off to the Arctic to find her friend.',NULL,1995),(10,'The Dark is Rising','Susan Cooper','Fantasy','A boy discovers his role in an ancient struggle between good and evil.',NULL,1973);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `commentId` int NOT NULL,
  `userId` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'I completely agree! Snape was loyal to Dumbledore all along.','2025-06-24 22:21:16',42),(2,2,'I think Snape had his own motives too, not just loyalty.','2025-06-24 22:21:16',42),(3,3,'That\'s an interesting angle, I hadn\'t considered that.','2025-06-24 22:21:16',42),(4,4,'Snape\'s actions were so complex — hard to judge him.','2025-06-24 22:21:16',42),(5,5,'What about the moments he seemed cruel? Were those part of the mission?','2025-06-24 22:21:16',42),(6,6,'I think he struggled between his own emotions and the mission.','2025-06-24 22:21:16',42),(7,7,'Snape is one of the most fascinating characters because of this.','2025-06-24 22:21:16',42),(8,8,'His love for Lily probably motivated everything.','2025-06-24 22:21:16',42),(9,9,'I wonder if Dumbledore ever doubted Snape.','2025-06-24 22:21:16',42),(10,10,'Great theory — I\'ll reread the books with this in mind.','2025-06-24 22:21:16',42);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerId` int NOT NULL,
  `followingId` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `followerId` (`followerId`,`followingId`),
  KEY `followingId` (`followingId`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followingId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdBy` int NOT NULL,
  `isRecommendation` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` text COLLATE utf8mb4_general_ci,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bookId` (`bookId`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `forums_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forums_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` VALUES (21,1,'Harry Potter - Fan Theories',1,0,'2025-06-24 21:57:56','A place to discuss your theories about the Harry Potter series.','2025-06-24 21:57:56'),(22,2,'Narnia - Hidden Meanings',2,1,'2025-06-24 21:57:56','Explore the deeper symbolism and messages in The Chronicles of Narnia.','2025-06-24 21:57:56'),(23,3,'Sherlock Holmes - Case Discussions',3,0,'2025-06-24 21:57:56','Analyze and debate the famous cases of Sherlock Holmes.','2025-06-24 21:57:56'),(24,4,'Fantasy Worlds and World-Building',4,1,'2025-06-24 21:57:56','Share thoughts on the art of creating rich fantasy universes.','2025-06-24 21:57:56'),(25,NULL,'Literature and Ethics',5,0,'2025-06-24 21:57:56','A thoughtful discussion on moral lessons from classic literature.','2025-06-24 21:57:56'),(26,NULL,'Young Writers Club',6,0,'2025-06-24 21:57:56','A forum for aspiring authors to share and critique original work.','2025-06-24 21:57:56'),(27,5,'The Hobbit - Journey Reflections',7,1,'2025-06-24 21:57:56','Discuss the themes of courage and friendship in The Hobbit.','2025-06-24 21:57:56'),(28,NULL,'Favorite Childhood Books',8,0,'2025-06-24 21:57:56','Share and revisit the books that shaped your childhood.','2025-06-24 21:57:56'),(29,NULL,'Historical Fiction and Facts',9,1,'2025-06-24 21:57:56','Compare historical fiction stories to real historical events.','2025-06-24 21:57:56'),(30,NULL,'Poetry Appreciation',10,0,'2025-06-24 21:57:56','A place to share and appreciate meaningful poetry.','2025-06-24 21:57:56'),(31,1,'Harry Potter - Fan Theories',1,0,'2025-06-24 21:58:57','A place to discuss your theories about the Harry Potter series.','2025-06-24 21:58:57'),(32,2,'Narnia - Hidden Meanings',2,1,'2025-06-24 21:58:57','Explore the deeper symbolism and messages in The Chronicles of Narnia.','2025-06-24 21:58:57'),(33,3,'Sherlock Holmes - Case Discussions',3,0,'2025-06-24 21:58:57','Analyze and debate the famous cases of Sherlock Holmes.','2025-06-24 21:58:57'),(34,4,'Fantasy Worlds and World-Building',4,1,'2025-06-24 21:58:57','Share thoughts on the art of creating rich fantasy universes.','2025-06-24 21:58:57'),(35,NULL,'Literature and Ethics',5,0,'2025-06-24 21:58:57','A thoughtful discussion on moral lessons from classic literature.','2025-06-24 21:58:57'),(36,NULL,'Young Writers Club',6,0,'2025-06-24 21:58:57','A forum for aspiring authors to share and critique original work.','2025-06-24 21:58:57'),(37,5,'The Hobbit - Journey Reflections',7,1,'2025-06-24 21:58:57','Discuss the themes of courage and friendship in The Hobbit.','2025-06-24 21:58:57'),(38,NULL,'Favorite Childhood Books',8,0,'2025-06-24 21:58:57','Share and revisit the books that shaped your childhood.','2025-06-24 21:58:57'),(39,NULL,'Historical Fiction and Facts',9,1,'2025-06-24 21:58:57','Compare historical fiction stories to real historical events.','2025-06-24 21:58:57'),(40,NULL,'Poetry Appreciation',10,0,'2025-06-24 21:58:57','A place to share and appreciate meaningful poetry.','2025-06-24 21:58:57');
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `forumId` int NOT NULL,
  `userId` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `forumId` (`forumId`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`forumId`) REFERENCES `forums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (42,21,1,'Snape\'s Secret Mission','Was Snape working for Dumbledore the entire time, even when it seemed he was loyal to Voldemort?','2025-06-24 19:01:25'),(43,21,2,'Dumbledore Knew Everything?','Did Dumbledore foresee all the events or was he improvising?','2025-06-24 19:01:25'),(44,21,3,'Neville the Chosen One?','Could Neville have been the true Chosen One according to the prophecy?','2025-06-24 19:01:25'),(45,21,4,'Time Turners and the War','Why didn\'t they use time turners to prevent key events in the war?','2025-06-24 19:01:25'),(46,21,5,'Harry as a Horcrux','Was Harry really an accidental Horcrux or part of Voldemort\'s plan?','2025-06-24 19:01:25'),(47,21,6,'Voldemort\'s Fear','What was Voldemort truly afraid of beyond death?','2025-06-24 19:01:25'),(48,21,7,'The Dursleys\' Role','Why did Dumbledore leave Harry with the Dursleys knowing how they treated him?','2025-06-24 19:01:25'),(49,21,8,'The Elder Wand\'s Loyalty','How does the Elder Wand choose its master?','2025-06-24 19:01:25'),(50,21,9,'Lily\'s Magic','Could Lily\'s protection have been stronger than we thought?','2025-06-24 19:01:25'),(51,21,10,'The Sorting Hat\'s Choices','Does the Sorting Hat ever change its mind after sorting?','2025-06-24 19:01:25'),(52,22,1,'Aslan and Sacrifice','What deeper message does Aslan\'s sacrifice convey about forgiveness and redemption?','2025-06-24 19:02:10'),(53,22,2,'The Wardrobe as a Portal','Does the wardrobe symbolize more than just a gateway to another world?','2025-06-24 19:02:10'),(54,22,3,'Faith and Doubt in Narnia','How do the books explore the tension between faith and doubt?','2025-06-24 19:02:10'),(55,22,4,'The White Witch\'s Symbolism','What might Jadis represent beyond simple evil?','2025-06-24 19:02:10'),(56,22,5,'Edmund\'s Betrayal','Is Edmund\'s betrayal a reflection of human weakness or something deeper?','2025-06-24 19:02:10'),(57,22,6,'The Lamp Post Mystery','What is the symbolic role of the lamp post in Narnia?','2025-06-24 19:02:10'),(58,22,7,'Lucy’s Pure Heart','How does Lucy\'s innocence drive the story forward?','2025-06-24 19:02:10'),(59,22,8,'Narnia’s Time Flow','What could the difference in time between Narnia and our world symbolize?','2025-06-24 19:02:10'),(60,22,9,'Aslan vs. the Witch','Does the battle represent a larger cosmic struggle?','2025-06-24 19:02:10'),(61,22,10,'The Role of Nature','How does nature itself take part in the moral story of Narnia?','2025-06-24 19:02:10'),(62,23,1,'Holmes\'s Deduction Skills','What makes Holmes\'s method of deduction so unique compared to modern detectives?','2025-06-24 19:02:43'),(63,23,2,'Moriarty\'s True Motive','Do we ever truly understand what drove Moriarty against Holmes?','2025-06-24 19:02:43'),(64,23,3,'The Hound of the Baskervilles','What makes this case stand out among Holmes\'s adventures?','2025-06-24 19:02:43'),(65,23,4,'Watson\'s Perspective','How reliable is Watson as the narrator of these cases?','2025-06-24 19:02:43'),(66,23,5,'Holmes and Justice','Is Holmes always on the side of the law, or on the side of justice?','2025-06-24 19:02:43'),(67,23,6,'Irene Adler','Why does Irene Adler leave such a lasting impression on Holmes?','2025-06-24 19:02:43'),(68,23,7,'London as a Character','How does London itself shape the atmosphere of the stories?','2025-06-24 19:02:43'),(69,23,8,'Holmes\'s Flaws','What are Sherlock\'s weaknesses and how do they affect his cases?','2025-06-24 19:02:43'),(70,23,9,'Holmes’s Disguises','Which disguise of Holmes do you find most clever?','2025-06-24 19:02:43'),(71,23,10,'Modern Holmes Adaptations','How do modern interpretations of Holmes stay true to the original character?','2025-06-24 19:02:43'),(72,24,1,'Building Magic Systems','What are key elements for creating a balanced magic system in fantasy worlds?','2025-06-24 19:03:16'),(73,24,2,'Inventing Languages','Tips for creating fictional languages that feel authentic.','2025-06-24 19:03:16'),(74,24,3,'Designing Maps','How detailed should maps of fantasy worlds be?','2025-06-24 19:03:16'),(75,24,4,'Creating Mythology','What role does original mythology play in world-building?','2025-06-24 19:03:16'),(76,24,5,'Politics in Fantasy','How do you create believable political systems in your world?','2025-06-24 19:03:16'),(77,24,6,'Cultural Diversity','How to make cultures in a fantasy world rich and respectful?','2025-06-24 19:03:16'),(78,24,7,'Economy and Trade','Why is thinking about economy crucial in building a realistic world?','2025-06-24 19:03:16'),(79,24,8,'Religion in Fantasy','How to handle religion in a fantasy world thoughtfully?','2025-06-24 19:03:16'),(80,24,9,'History and Legends','How do you weave legends and history into your world-building?','2025-06-24 19:03:16'),(81,24,10,'Inspiration from Real History','How much should a fantasy world borrow from real-world history?','2025-06-24 19:03:16'),(82,25,1,'Moral Dilemmas in Literature','Which books present the most challenging moral questions?','2025-06-24 19:03:44'),(83,25,2,'The Ethics of Revenge','How do authors explore revenge and justice?','2025-06-24 19:03:44'),(84,25,3,'Hero or Anti-Hero?','When does a character cross the line?','2025-06-24 19:03:44'),(85,25,4,'Literature and Social Responsibility','Do authors have a duty to promote certain values?','2025-06-24 19:03:44'),(86,25,5,'Freedom vs. Order','How is this conflict portrayed in classic novels?','2025-06-24 19:03:44'),(87,25,6,'Ethical Gray Areas','Which literary characters live in the gray?','2025-06-24 19:03:44'),(88,25,7,'The Role of Conscience','How do authors depict inner moral struggle?','2025-06-24 19:03:44'),(89,25,8,'Sacrifice for the Greater Good','Books where characters give up everything for others.','2025-06-24 19:03:44'),(90,25,9,'Justice in Fantasy Worlds','How do fantasy authors handle justice differently?','2025-06-24 19:03:44'),(91,25,10,'Ethics in War Literature','How is morality portrayed in books about war?','2025-06-24 19:03:44'),(92,26,1,'Sharing My First Story','Here’s my first short story draft — would love feedback!','2025-06-24 19:03:59'),(93,26,2,'How to Create Characters','Tips for making characters come alive.','2025-06-24 19:03:59'),(94,26,3,'Writing Dialogue','Struggling to make dialogue sound natural — advice?','2025-06-24 19:03:59'),(95,26,4,'Overcoming Writer’s Block','How do you deal with writer’s block?','2025-06-24 19:03:59'),(96,26,5,'Short Story vs. Novel','When do you know your idea is big enough for a novel?','2025-06-24 19:03:59'),(97,26,6,'Writing Fantasy Worlds','How to start world-building?','2025-06-24 19:03:59'),(98,26,7,'Writing Competitions','Let’s share links to contests for young writers.','2025-06-24 19:03:59'),(99,26,8,'Poetry Corner','Share your poems here!','2025-06-24 19:03:59'),(100,26,9,'First Person or Third?','What’s your preferred point of view?','2025-06-24 19:03:59'),(101,26,10,'Writing for Younger Readers','Tips for writing children’s stories.','2025-06-24 19:03:59'),(102,27,1,'Bilbo’s Growth','How does Bilbo change through the journey?','2025-06-24 19:04:13'),(103,27,2,'Friendship Themes','The value of friendship in The Hobbit.','2025-06-24 19:04:13'),(104,27,3,'The Role of the Dwarves','Which dwarf stood out most and why?','2025-06-24 19:04:13'),(105,27,4,'Gollum’s Riddle Scene','What makes this scene so memorable?','2025-06-24 19:04:13'),(106,27,5,'Smaug’s Symbolism','What could Smaug represent beyond being a dragon?','2025-06-24 19:04:13'),(107,27,6,'The Arkenstone','Is the Arkenstone just a gem or more?','2025-06-24 19:04:13'),(108,27,7,'Bilbo’s Courage','Moments that showed Bilbo’s bravery.','2025-06-24 19:04:13'),(109,27,8,'Nature in The Hobbit','How is nature depicted in the story?','2025-06-24 19:04:13'),(110,27,9,'The Battle of Five Armies','What lessons can we learn from it?','2025-06-24 19:04:13'),(111,27,10,'The Importance of Home','What does home mean to Bilbo?','2025-06-24 19:04:13'),(112,28,1,'The Tale of Peter Rabbit','Why this book stayed with me.','2025-06-24 19:04:40'),(113,28,2,'Heidi','What I loved about Heidi’s adventures.','2025-06-24 19:04:40'),(114,28,3,'Anne of Green Gables','Anne’s imagination inspired me.','2025-06-24 19:04:40'),(115,28,4,'Winnie-the-Pooh','Kindness and humor in simple stories.','2025-06-24 19:04:40'),(116,28,5,'The Railway Children','A story of resilience.','2025-06-24 19:04:40'),(117,28,6,'The Wind in the Willows','Friendship and adventure.','2025-06-24 19:04:40'),(118,28,7,'Black Beauty','What this taught me about empathy.','2025-06-24 19:04:40'),(119,28,8,'The Secret Garden','A story of healing and growth.','2025-06-24 19:04:40'),(120,28,9,'Little Women','Strong female characters I admired.','2025-06-24 19:04:40'),(121,28,10,'The Velveteen Rabbit','Lessons on love and loss.','2025-06-24 19:04:40'),(122,29,1,'Balancing Fact and Fiction','How much history should a novel include?','2025-06-24 19:04:57'),(123,29,2,'Favorite Historical Novel','What is your favorite and why?','2025-06-24 19:04:57'),(124,29,3,'Research Tips','How do authors research historical settings?','2025-06-24 19:04:57'),(125,29,4,'Historical Figures in Fiction','Which fictional depictions felt most real?','2025-06-24 19:04:57'),(126,29,5,'Historical Accuracy','Does it matter if novels change facts?','2025-06-24 19:04:57'),(127,29,6,'Underrepresented Eras','Which eras deserve more novels?','2025-06-24 19:04:57'),(128,29,7,'Historical Settings','Most vivid settings you’ve read about.','2025-06-24 19:04:57'),(129,29,8,'Fictional Diaries','Stories told as diaries — do you like them?','2025-06-24 19:04:57'),(130,29,9,'War in Historical Fiction','How is war portrayed differently in fiction?','2025-06-24 19:04:57'),(131,29,10,'Family Sagas','Generations of families in history.','2025-06-24 19:04:57'),(132,30,1,'Favorite Classic Poem','Which classic poem moves you most?','2025-06-24 19:05:12'),(133,30,2,'Modern Poetry','Any modern poets you admire?','2025-06-24 19:05:12'),(134,30,3,'Writing My First Poem','Sharing my first poem attempt.','2025-06-24 19:05:12'),(135,30,4,'Haiku Challenge','Let’s write haikus together!','2025-06-24 19:05:12'),(136,30,5,'Poetry and Nature','Favorite poems about nature.','2025-06-24 19:05:12'),(137,30,6,'Poetry and Faith','Poems that touch the soul.','2025-06-24 19:05:12'),(138,30,7,'Poetry and Love','What makes a love poem timeless?','2025-06-24 19:05:12'),(139,30,8,'Poetry in Song Lyrics','When do lyrics become poetry?','2025-06-24 19:05:12'),(140,30,9,'Translating Poetry','Challenges of translating poetry.','2025-06-24 19:05:12'),(141,30,10,'Poetry in Our Lives','How do you include poetry in daily life?','2025-06-24 19:05:12');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `bookId` int NOT NULL,
  `userId` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`bookId`,`userId`),
  UNIQUE KEY `bookId` (`bookId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK ((`rating` between 1 and 5)),
  CONSTRAINT `ratings_chk_2` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','moderator','admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `profileImage` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'דנה לוי','dana.levi@example.com','1234abcd','user','dana.jpg','2025-06-19 17:42:15',1,'user1'),(2,'יואב כהן','yoav.cohen@example.com','1234abcd','user','yoav.jpg','2025-06-19 17:42:15',1,'user2'),(3,'רוני ברק','roni.barak@example.com','1234abcd','user','roni.jpg','2025-06-19 17:42:15',1,'user3'),(4,'נועה שחר','noa.shahar@example.com','1234abcd','user','noa.jpg','2025-06-19 17:42:15',1,'user4'),(5,'איתי לוי','itai.levi@example.com','1234abcd','user','itai.jpg','2025-06-19 17:42:15',1,'user5'),(6,'טליה הדר','talya.hadar@example.com','1234abcd','user','talya.jpg','2025-06-19 17:42:15',0,'user6'),(7,'אביב שלו','aviv.shalev@example.com','1234abcd','user','aviv.jpg','2025-06-19 17:42:15',1,'user7'),(8,'תמר זיו','tamar.ziv@example.com','1234abcd','user','tamar.jpg','2025-06-19 17:42:15',1,'user8'),(9,'גיל בן-דוד','gil.bendavid@example.com','1234abcd','user','gil.jpg','2025-06-19 17:42:15',1,'user9'),(10,'שחר פרץ','shahar.peretz@example.com','1234abcd','user','shahar.jpg','2025-06-19 17:42:15',0,'user10'),(11,'רותם מזרחי','moderator@example.com','mod1234','moderator','rotem.jpg','2025-06-19 17:42:15',1,'user11'),(12,'נעמה רוזן','admin@example.com','admin1234','admin','naama.jpg','2025-06-19 17:42:15',1,'user12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-24 22:31:24
