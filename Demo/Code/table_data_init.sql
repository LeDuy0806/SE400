/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `todo_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('TO_DO','DOING','DONE','DELETED') NOT NULL DEFAULT 'TO_DO',
  `description` varchar(255) DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'High',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `todo_items` (`id`, `title`, `status`, `description`, `tag`, `created_at`, `updated_at`) VALUES
(1, 'Future Marketing Strategist', 'TO_DO', 'Reiciendis nulla repudiandae repudiandae molestiae officiis nulla a explicabo quia.', 'High', '2024-10-04 17:18:02', '2024-10-04 17:29:49');
INSERT INTO `todo_items` (`id`, `title`, `status`, `description`, `tag`, `created_at`, `updated_at`) VALUES
(2, 'Senior Research Analyst', 'TO_DO', 'Ea rerum non.', 'Medium', '2024-10-04 17:18:03', '2024-10-04 17:29:49');
INSERT INTO `todo_items` (`id`, `title`, `status`, `description`, `tag`, `created_at`, `updated_at`) VALUES
(3, 'District Solutions Strategist', 'DOING', 'Corrupti harum assumenda cumque placeat eos dolor rerum et.', 'High', '2024-10-04 17:18:04', '2024-10-04 17:31:47');
INSERT INTO `todo_items` (`id`, `title`, `status`, `description`, `tag`, `created_at`, `updated_at`) VALUES
(4, 'Dynamic Research Analyst', 'DONE', 'Error laborum esse ipsa qui in commodi at itaque qui.', 'High', '2024-10-04 17:18:05', '2024-10-05 09:44:06'),
(5, 'Future Creative Executive', 'DONE', 'Itaque nostrum quam optio quisquam atque.', 'High', '2024-10-04 17:18:06', '2024-10-05 14:37:55'),
(6, 'Chief Factors Orchestrator', 'DONE', 'Sunt earum eligendi commodi illo.', 'Low', '2024-10-04 17:18:06', '2024-10-05 04:15:27'),
(7, 'Chief Interactions Coordinator', 'DOING', 'Commodi eligendi quo aut quas rerum odio est voluptatem.', 'Medium', '2024-10-04 17:18:07', '2024-10-05 04:15:22'),
(8, 'Product Metrics Assistant', 'DOING', 'Illo deleniti dignissimos nemo optio quisquam quasi vel aliquam tempora.', 'Low', '2024-10-04 17:18:08', '2024-10-05 09:44:01'),
(9, 'Dynamic Creative Developer', 'DOING', 'Voluptas omnis voluptatem dignissimos assumenda suscipit atque consequatur optio.', 'High', '2024-10-04 17:18:09', '2024-10-05 14:37:50'),
(10, 'Principal Identity Representative', 'TO_DO', 'Ut ducimus voluptas dolores nulla.', 'High', '2024-10-04 17:18:09', '2024-10-05 14:57:53'),
(11, 'Chief Brand Associate', 'DONE', 'Cupiditate itaque quos amet itaque quia sunt.', 'Medium', '2024-10-04 17:18:10', '2024-10-05 14:55:47'),
(12, 'Corporate Research Analyst', 'TO_DO', 'Dignissimos qui cum doloribus ratione aliquid distinctio pariatur.', 'Medium', '2024-10-04 17:18:11', '2024-10-05 14:36:12'),
(13, 'Human Branding Officer', 'DONE', 'Quo ab iste fugiat nulla.', 'Low', '2024-10-04 17:34:26', '2024-10-05 14:57:50'),
(14, 'Global Factors Coordinator', 'DOING', 'Doloremque dolor id et repellendus non et ab reiciendis voluptatem.', 'Medium', '2024-10-04 17:36:15', '2024-10-05 14:57:52');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;