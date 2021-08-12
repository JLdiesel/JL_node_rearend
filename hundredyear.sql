/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : hundredyear

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 12/08/2021 15:32:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (28, 'f75ba5c5e270852855d4cdf378969b0e', 'image/png', 40603, 37, '2021-08-02 14:03:38', '2021-08-02 14:03:38');
INSERT INTO `avatar` VALUES (31, '3ebf3d8f8ca5f44ff867aab9cc57a6f6', 'image/png', 40603, 42, '2021-08-03 19:59:44', '2021-08-03 19:59:44');
INSERT INTO `avatar` VALUES (52, '572d3e9e74537ac6ef82256ceb8a1657', 'image', 200824, 39, '2021-08-08 16:46:24', '2021-08-08 16:46:24');
INSERT INTO `avatar` VALUES (53, 'ed73ddf9efed601c68776c5a0c1ec45d', 'image', 56985, 39, '2021-08-08 18:22:18', '2021-08-08 18:22:18');
INSERT INTO `avatar` VALUES (54, 'cdd94441294728408900ed25784520c3', 'image', 200364, 39, '2021-08-08 18:22:23', '2021-08-08 18:22:23');
INSERT INTO `avatar` VALUES (55, '250c5fdf8e9594bd027d8ae810a1b059', 'image', 200364, 39, '2021-08-08 18:23:48', '2021-08-08 18:23:48');
INSERT INTO `avatar` VALUES (56, 'a87791748e92d3ad8805889b9013255b', 'image', 56985, 39, '2021-08-08 18:51:49', '2021-08-08 18:51:49');
INSERT INTO `avatar` VALUES (57, '3c889285212193ea083669480ce583ba', 'image', 56985, 39, '2021-08-08 18:53:26', '2021-08-08 18:53:26');
INSERT INTO `avatar` VALUES (58, 'a1607da20747cd2d2a02fc3c19f1ba2c', 'image', 56985, 39, '2021-08-08 18:57:29', '2021-08-08 18:57:29');
INSERT INTO `avatar` VALUES (59, '1b810a591508fc093613bb892f153b30', 'image', 56985, 39, '2021-08-10 10:01:43', '2021-08-10 10:01:43');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `comment_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (12, '说的对啊', 42, 14, '2021-08-03 16:37:20', '2021-08-12 15:00:14', 15);
INSERT INTO `comment` VALUES (15, 'wsnd', 42, 14, '2021-08-03 16:47:26', '2021-08-12 15:00:23', 16);
INSERT INTO `comment` VALUES (16, '我是猪鼻3', 39, 15, '2021-08-12 08:41:19', '2021-08-12 08:41:19', NULL);
INSERT INTO `comment` VALUES (17, '我是猪', 39, 15, '2021-08-12 13:31:27', '2021-08-12 13:31:27', NULL);

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `moment_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (28, '9f470113e3fb9a2e1d5ba6cfc853578c', 'image/png', 1216, 14, 42, '2021-08-03 10:08:32', '2021-08-03 10:08:32');
INSERT INTO `file` VALUES (29, '9fe486d78e7fa7cfb9c10ea2cb134d01', 'image/png', 1216, 14, 42, '2021-08-03 10:08:40', '2021-08-03 10:08:40');
INSERT INTO `file` VALUES (30, 'ae48fd43d254f02e543596d86952066d', 'image/png', 40603, 14, 42, '2021-08-03 10:08:40', '2021-08-03 10:08:40');
INSERT INTO `file` VALUES (31, '48647ce551005eb58b97ccf843df8761', 'image/png', 80943, 14, 42, '2021-08-03 10:08:40', '2021-08-03 10:08:40');
INSERT INTO `file` VALUES (32, '16ce373ef26728d1cb0721f65804c464', 'image/png', 315906, 14, NULL, '2021-08-09 12:57:15', '2021-08-09 12:57:15');
INSERT INTO `file` VALUES (33, '5a3c3e94a03130f039d6e91536f548f7', 'image/png', 288676, 14, NULL, '2021-08-09 12:57:15', '2021-08-09 12:57:15');
INSERT INTO `file` VALUES (34, '0e567f488aafb2b9af072817aa15e5bb', 'image/png', 546733, 17, NULL, '2021-08-09 12:59:40', '2021-08-09 12:59:40');
INSERT INTO `file` VALUES (35, '392116aaff9a95c051408b5f1d446b23', 'image/png', 288676, 17, NULL, '2021-08-09 12:59:40', '2021-08-09 12:59:40');
INSERT INTO `file` VALUES (36, '6c42d610785a79c2e05670c30237b282', 'image/png', 260497, 17, NULL, '2021-08-09 12:59:40', '2021-08-09 12:59:40');
INSERT INTO `file` VALUES (37, 'dc66faf503aca409f24d9ac567584045', 'image/png', 546733, 18, NULL, '2021-08-09 13:00:05', '2021-08-09 13:00:05');
INSERT INTO `file` VALUES (38, 'db3b17dd1ab6e08bf2cd7b204df6e91e', 'image/png', 288676, 18, NULL, '2021-08-09 13:00:06', '2021-08-09 13:00:06');
INSERT INTO `file` VALUES (39, '9a1fab2a89e71ba6feeef9a1558c67fe', 'image/png', 260497, 18, NULL, '2021-08-09 13:00:06', '2021-08-09 13:00:06');
INSERT INTO `file` VALUES (40, '50d3a1ee4d27ed9a37497daae86bb086', 'image/png', 315906, 15, NULL, '2021-08-11 10:32:46', '2021-08-11 10:32:46');
INSERT INTO `file` VALUES (41, '414a178e9f4dc55ab9be7c3985cbe1d8', 'image/png', 217253, 15, NULL, '2021-08-11 10:32:46', '2021-08-11 10:32:46');
INSERT INTO `file` VALUES (42, '0cde59fe552c38628a6d7632df18ffaf', 'image/png', 206712, 15, NULL, '2021-08-11 10:32:46', '2021-08-11 10:32:46');
INSERT INTO `file` VALUES (43, '3bba5b4d1a2a96c154af8fef6e58f08d', 'image/png', 315906, 16, NULL, '2021-08-11 10:33:03', '2021-08-11 10:33:03');
INSERT INTO `file` VALUES (44, '459b63ea070b9d39b2169efd45c28214', 'image/png', 546733, 16, NULL, '2021-08-11 10:33:04', '2021-08-11 10:33:04');
INSERT INTO `file` VALUES (45, '9f7a9a198bc8ecddb77899fd8d82904c', 'image/png', 266193, 16, NULL, '2021-08-11 10:33:04', '2021-08-11 10:33:04');

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `follow_user_id` int(11) NOT NULL,
  `status` tinyint(1) NULL DEFAULT 0,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `follow_user_id`(`follow_user_id`) USING BTREE,
  UNIQUE INDEX `user_followed_indx`(`user_id`, `follow_user_id`) USING BTREE,
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES (1, 42, 42, 0, '2021-08-03 09:39:46', '2021-08-03 09:39:46');
INSERT INTO `follow` VALUES (2, 42, 40, 0, '2021-08-03 09:47:52', '2021-08-03 09:47:52');
INSERT INTO `follow` VALUES (3, 42, 32, 0, '2021-08-03 09:47:56', '2021-08-03 09:47:56');
INSERT INTO `follow` VALUES (4, 42, 33, 0, '2021-08-03 11:55:59', '2021-08-03 11:55:59');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` tinyint(10) NULL DEFAULT NULL COMMENT '0为动态文章，1为俯瞰百年文章，2为派别文章，3为名角文章，4为剧本',
  `ezcontent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_ibfk_2`(`role_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `moment_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (14, '喜欢越剧，因为爱那份温柔缠绵轻灵动人。眼波流转，水袖轻扬，云步轻点，温柔喟叹。山水清秀的江南孕育了越剧的诗情画意。沪剧太芜杂，黄梅戏忒土，扬剧过于烟尘气，至于河北梆子河南梆子更与灵动无缘。/d越剧的桃红柳绿痴男怨女雨恨云愁风月无边，最是熨帖人心思。《红楼梦》，《西厢记》，《陆游与唐婉》，《追鱼》，《碧玉簪》……一提便牵扯出一段情愫。花心思雪肚肠，惟有越剧消受得起。/img恋上越剧的人必是痴情者。轻吟浅唱间，宝玉黛玉眉眼深情，鲤鱼精一往情深，唐婉凄哀的眼神钻碎人心，山伯英台翩翩化蝶……越剧在情上作文章，看天地看前后，唱不离一个情字。江山功名如烟尘，哪抵得过孟丽君一声娇嗔。仙道神力本无妄，哪替得了断桥相会西湖泛舟。翠绸青衫里，啼不尽青山隐隐绿水幽幽。/d越剧的唱腔以婉约轻灵为主，那是西窗竹影烟波画船，是流水落花燕语呢喃，是寒塘鹤影冷月诗魂。越剧的服饰婉丽秀气，软烟罗香云纱碎花云绸豆绿水缎，盈盈一握小蛮腰。原先多为女串生角，眉眼姿丽的女子，将小生演得那般风流俊朗。越剧，只能浸在婉转花香润在朦胧烟雨里。细碎的唱词，温静的底蕴，缓缓吟轻轻唱。/img在我们的小镇上，不少老人喜欢越剧。闲来无事，就一起聚在镇子的小桥畔，或者穿堂风而过的弄躺里，猫儿蜷在脚旁，岁月静好，他们沉浸在古老的旋律里。/d我祖母亦欢喜听越剧。老家青瓦白墙的院子里，老广播刺刺拉拉放一段甜糯婉转的越剧，栀子花正开着，润润的小雨下得没有尽头。祖母在走廊里绣古老的花样，一面轻轻哼唱。日子就在这绵长的唱腔里拉扯得很长，宛如祖母手里的丝线。/img看《可凡倾听》一期节目：红楼梦圆。越剧名家徐玉兰王文娟老师来了。二人年事已高，却皆精神矍铄。二老言语间是软糯的越腔。/d当年拍摄越剧电影《红楼梦》的琐事细细想慢慢谈，台下大批戏迷缓缓想悠悠忆。人人脸上都有韶光飞逝的沧桑与积淀，旧梦重回的温馨与陶醉。也只有越剧，容养着这份天长地久细水长流。/d记得浙江小百花艺术团曾经赴台演出，场场爆满，多少人拭着眼角沉浸在那旋律与腔调里。演出结束后，一个八十多岁的台湾老太太，到后台去，颤抖着声音唱：我家有个小九妹，聪明伶俐人敬佩……/img老太太说，这些年啊，就盼着这乡音……在场者无不动容。有一段时间，越剧如旗袍、国画等传统艺术一样不景气，剧团四处奔波亦收效甚微。小百花艺术团于是走过了不为人知的坎坷波折。/d陶慧敏、何赛飞等优秀的越剧演员纷纷转型。俊女子茅威涛领小百花艰苦创业寻求发展。小百花二十岁生日，终于迎来了越剧的春天，姹紫嫣红秀色满园。茅茅组织了小百花会员，大家一起参加“告别二十年”大型越剧表演会。会员们每人都领到一枚小小的徽章，是一朵花，凝结了深爱与痴情，执著与坚守。/d大家将徽章别在胸口，都泪光闪烁。茅茅在表演会上罗衫广袖，对那泪水浸染歌声渗透的舞台深深拜，深深拜。谁翻乐府旧谣，恰心事随风飘。', NULL, '2021-08-02 21:47:34', '2021-08-09 15:09:56', '文章标题2', 'http://192.168.50.146:3000/moment/images/16ce373ef26728d1cb0721f65804c464', 1, '我是简介1', NULL);
INSERT INTO `moment` VALUES (15, '我发表了第三篇文章', 42, '2021-08-03 11:24:36', '2021-08-11 10:32:45', '文章标题23', 'http://192.168.50.146:3000/moment/images/50d3a1ee4d27ed9a37497daae86bb086', 0, NULL, NULL);
INSERT INTO `moment` VALUES (16, '我是猪b', 42, '2021-08-03 11:57:05', '2021-08-11 10:33:02', '文章标题234', 'http://192.168.50.146:3000/moment/images/3bba5b4d1a2a96c154af8fef6e58f08d', 0, NULL, NULL);
INSERT INTO `moment` VALUES (17, '喜欢越剧，因为爱那份温柔缠绵轻灵动人。眼波流转，水袖轻扬，云步轻点，温柔喟叹。山水清秀的江南孕育了越剧的诗情画意。沪剧太芜杂，黄梅戏忒土，扬剧过于烟尘气，至于河北梆子河南梆子更与灵动无缘。/d越剧的桃红柳绿痴男怨女雨恨云愁风月无边，最是熨帖人心思。《红楼梦》，《西厢记》，《陆游与唐婉》，《追鱼》，《碧玉簪》……一提便牵扯出一段情愫。花心思雪肚肠，惟有越剧消受得起。/img恋上越剧的人必是痴情者。轻吟浅唱间，宝玉黛玉眉眼深情，鲤鱼精一往情深，唐婉凄哀的眼神钻碎人心，山伯英台翩翩化蝶……越剧在情上作文章，看天地看前后，唱不离一个情字。江山功名如烟尘，哪抵得过孟丽君一声娇嗔。仙道神力本无妄，哪替得了断桥相会西湖泛舟。翠绸青衫里，啼不尽青山隐隐绿水幽幽。/d越剧的唱腔以婉约轻灵为主，那是西窗竹影烟波画船，是流水落花燕语呢喃，是寒塘鹤影冷月诗魂。越剧的服饰婉丽秀气，软烟罗香云纱碎花云绸豆绿水缎，盈盈一握小蛮腰。原先多为女串生角，眉眼姿丽的女子，将小生演得那般风流俊朗。越剧，只能浸在婉转花香润在朦胧烟雨里。细碎的唱词，温静的底蕴，缓缓吟轻轻唱。/img在我们的小镇上，不少老人喜欢越剧。闲来无事，就一起聚在镇子的小桥畔，或者穿堂风而过的弄躺里，猫儿蜷在脚旁，岁月静好，他们沉浸在古老的旋律里。/d我祖母亦欢喜听越剧。老家青瓦白墙的院子里，老广播刺刺拉拉放一段甜糯婉转的越剧，栀子花正开着，润润的小雨下得没有尽头。祖母在走廊里绣古老的花样，一面轻轻哼唱。日子就在这绵长的唱腔里拉扯得很长，宛如祖母手里的丝线。/img看《可凡倾听》一期节目：红楼梦圆。越剧名家徐玉兰王文娟老师来了。二人年事已高，却皆精神矍铄。二老言语间是软糯的越腔。/d当年拍摄越剧电影《红楼梦》的琐事细细想慢慢谈，台下大批戏迷缓缓想悠悠忆。人人脸上都有韶光飞逝的沧桑与积淀，旧梦重回的温馨与陶醉。也只有越剧，容养着这份天长地久细水长流。/d记得浙江小百花艺术团曾经赴台演出，场场爆满，多少人拭着眼角沉浸在那旋律与腔调里。演出结束后，一个八十多岁的台湾老太太，到后台去，颤抖着声音唱：我家有个小九妹，聪明伶俐人敬佩……/img老太太说，这些年啊，就盼着这乡音……在场者无不动容。有一段时间，越剧如旗袍、国画等传统艺术一样不景气，剧团四处奔波亦收效甚微。小百花艺术团于是走过了不为人知的坎坷波折。/d陶慧敏、何赛飞等优秀的越剧演员纷纷转型。俊女子茅威涛领小百花艰苦创业寻求发展。小百花二十岁生日，终于迎来了越剧的春天，姹紫嫣红秀色满园。茅茅组织了小百花会员，大家一起参加“告别二十年”大型越剧表演会。会员们每人都领到一枚小小的徽章，是一朵花，凝结了深爱与痴情，执著与坚守。/d大家将徽章别在胸口，都泪光闪烁。茅茅在表演会上罗衫广袖，对那泪水浸染歌声渗透的舞台深深拜，深深拜。谁翻乐府旧谣，恰心事随风飘。', NULL, '2021-08-09 12:46:29', '2021-08-09 15:10:01', '文章标题', 'http://192.168.50.146:3000/moment/images/0e567f488aafb2b9af072817aa15e5bb', 1, '文章简介', NULL);
INSERT INTO `moment` VALUES (18, '袁派的特色', NULL, '2021-08-09 12:50:37', '2021-08-09 13:00:05', '袁派', 'http://192.168.50.146:3000/moment/images/dc66faf503aca409f24d9ac567584045', 2, '袁派的简介', NULL);

-- ----------------------------
-- Table structure for moment_tag
-- ----------------------------
DROP TABLE IF EXISTS `moment_tag`;
CREATE TABLE `moment_tag`  (
  `moment_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`moment_id`, `tag_id`) USING BTREE,
  INDEX `tag_id`(`tag_id`) USING BTREE,
  CONSTRAINT `moment_tag_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_tag
-- ----------------------------
INSERT INTO `moment_tag` VALUES (14, 10, '2021-08-03 16:21:25', '2021-08-03 16:21:25');
INSERT INTO `moment_tag` VALUES (14, 11, '2021-08-03 16:21:25', '2021-08-03 16:21:25');
INSERT INTO `moment_tag` VALUES (14, 12, '2021-08-06 13:11:55', '2021-08-06 13:11:55');
INSERT INTO `moment_tag` VALUES (14, 13, '2021-08-06 13:11:55', '2021-08-06 13:11:55');
INSERT INTO `moment_tag` VALUES (15, 11, '2021-08-06 13:19:40', '2021-08-06 13:19:40');
INSERT INTO `moment_tag` VALUES (15, 12, '2021-08-06 13:19:41', '2021-08-06 13:19:41');

-- ----------------------------
-- Table structure for orider
-- ----------------------------
DROP TABLE IF EXISTS `orider`;
CREATE TABLE `orider`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL,
  `shopCar_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `count` int(11) NULL DEFAULT 1,
  `status` tinyint(1) NULL DEFAULT 0,
  `howPay` tinyint(1) NULL DEFAULT 0,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shopCar_id`(`shopCar_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `address_id`(`address_id`) USING BTREE,
  INDEX `shop_id`(`shop_id`) USING BTREE,
  CONSTRAINT `orider_ibfk_1` FOREIGN KEY (`shopCar_id`) REFERENCES `shopcar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orider_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orider_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `useraddress` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orider_ibfk_4` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orider
-- ----------------------------
INSERT INTO `orider` VALUES (2, 13, 1, 42, 3, 1, 0, 0, '2021-08-06 10:54:39');
INSERT INTO `orider` VALUES (3, 13, 1, 39, 3, 1, 1, 0, '2021-08-09 20:02:34');
INSERT INTO `orider` VALUES (4, 12, 4, 39, 12, 1, 0, 0, '2021-08-11 09:01:52');
INSERT INTO `orider` VALUES (5, 12, 5, 39, 12, 1, 0, 0, '2021-08-11 09:07:48');

-- ----------------------------
-- Table structure for recomment
-- ----------------------------
DROP TABLE IF EXISTS `recomment`;
CREATE TABLE `recomment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `recomment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recomment
-- ----------------------------
INSERT INTO `recomment` VALUES (4, 42, 15, 'wsnd234', '2021-08-03 19:06:04', '2021-08-03 19:06:04');
INSERT INTO `recomment` VALUES (5, 42, 12, '讲的真不错', '2021-08-04 09:07:50', '2021-08-12 10:20:21');
INSERT INTO `recomment` VALUES (6, 39, 16, '讲的真不错', '2021-08-12 13:25:54', '2021-08-12 13:25:54');
INSERT INTO `recomment` VALUES (7, 39, 17, '讲的真不错2', '2021-08-12 13:34:16', '2021-08-12 13:34:16');
INSERT INTO `recomment` VALUES (8, 39, 17, '讲的真不错2', '2021-08-12 14:37:16', '2021-08-12 14:37:16');
INSERT INTO `recomment` VALUES (9, 39, 16, '讲的真不错2', '2021-08-12 14:37:20', '2021-08-12 14:37:20');
INSERT INTO `recomment` VALUES (10, 39, 15, '讲的真不错2', '2021-08-12 14:37:22', '2021-08-12 14:37:22');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` float NOT NULL,
  `sellnum` int(11) NULL DEFAULT 0,
  `imguri` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` tinyint(1) NULL DEFAULT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES (12, '衣服', 28, 5, 'http://192.168.50.146:3000/shop/shopBanner/7d7fba48a77908125bdf67dd6abc1d26', 0, '这件衣服是清朝年间慈禧太后穿过的');
INSERT INTO `shop` VALUES (13, '衣服', 28, 5, 'http://192.168.50.146:3000/shop/shopBanner/a88856016632acd7540777d3111baafd', 1, '这件衣服是清朝年间慈禧太后穿过的');

-- ----------------------------
-- Table structure for shopbannerpic
-- ----------------------------
DROP TABLE IF EXISTS `shopbannerpic`;
CREATE TABLE `shopbannerpic`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `shop_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shop_id`(`shop_id`) USING BTREE,
  CONSTRAINT `shopbannerpic_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopbannerpic
-- ----------------------------
INSERT INTO `shopbannerpic` VALUES (8, '5c3db2ae743a343fc9eec9a136ab0b5b', 'image/png', 40603, 12);
INSERT INTO `shopbannerpic` VALUES (9, 'dc8eafbd562aa956ad6ee6542f442b65', 'image/png', 1942, 12);
INSERT INTO `shopbannerpic` VALUES (10, '55a3e969bc4ec840c01e1a1ac9a7e1d5', 'image/jpeg', 2931, 12);
INSERT INTO `shopbannerpic` VALUES (11, '7d7fba48a77908125bdf67dd6abc1d26', 'image/png', 206712, 12);
INSERT INTO `shopbannerpic` VALUES (12, 'a477e63b4729dde2c4a446f89f677e13', 'image/png', 217253, 12);
INSERT INTO `shopbannerpic` VALUES (13, '2e0df97197194db1bc4f64ea53187918', 'image/png', 288676, 12);
INSERT INTO `shopbannerpic` VALUES (14, 'a88856016632acd7540777d3111baafd', 'image/png', 532425, 13);
INSERT INTO `shopbannerpic` VALUES (15, '82ed169a383147404d4ac8111effaf64', 'image/png', 546733, 13);
INSERT INTO `shopbannerpic` VALUES (16, '54399d31a922761760883499b1c3c4a6', 'image/png', 803698, 13);

-- ----------------------------
-- Table structure for shopcar
-- ----------------------------
DROP TABLE IF EXISTS `shopcar`;
CREATE TABLE `shopcar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `shop_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shop_id`(`shop_id`) USING BTREE,
  CONSTRAINT `shopcar_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopcar
-- ----------------------------
INSERT INTO `shopcar` VALUES (1, '03775c7bc31fab8eca708a842e47b752', '红色', 'image/png', 998, 80943, 13);
INSERT INTO `shopcar` VALUES (2, '387dfa171dfe97ca16f9fb8602e4293a', '白色', 'image/png', 661, 40603, 13);
INSERT INTO `shopcar` VALUES (3, '775ebdae5a26270d6fbf5830bf7710e0', '白色', 'image/png', 662, 1942, 13);
INSERT INTO `shopcar` VALUES (4, '155cb6b5ea03d306ba2bf60cf0fe12eb', '绿色', 'image/png', 665, 80943, 12);
INSERT INTO `shopcar` VALUES (5, '1aafa77913a8ce745d195f51954bb82a', '绿色', 'image/png', 66, 40603, 12);
INSERT INTO `shopcar` VALUES (6, 'f8fee9423ff58d7f1ab0e5e004617567', '绿色', 'image/png', 6, 1942, 12);
INSERT INTO `shopcar` VALUES (7, '2926cbdc1f4564c0f809b84133647c33', '绿色', 'image/png', 688, 546733, 12);
INSERT INTO `shopcar` VALUES (8, '2fe0306823feb96e9359bd2449f9a372', '绿色', 'image/png', 699, 981057, 12);
INSERT INTO `shopcar` VALUES (9, 'bd59bd325b823872036aca78725f20a7', '绿色', 'image/png', 698, 546733, 12);
INSERT INTO `shopcar` VALUES (10, '539d00d9a66aaa5389244abed0df4e39', '绿色', 'image/png', 610, 546733, 13);
INSERT INTO `shopcar` VALUES (11, 'b9530ea0ef17bd79c64476c1e8745c73', '绿色', 'image/png', 616, 981057, 13);
INSERT INTO `shopcar` VALUES (12, 'b8b2a204437ca7812a210011cb85d2e6', '粉色', 'image/png', 611, 546733, 13);

-- ----------------------------
-- Table structure for shopinnerpic
-- ----------------------------
DROP TABLE IF EXISTS `shopinnerpic`;
CREATE TABLE `shopinnerpic`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `shop_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shop_id`(`shop_id`) USING BTREE,
  CONSTRAINT `shopinnerpic_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopinnerpic
-- ----------------------------
INSERT INTO `shopinnerpic` VALUES (10, 'dfc01693de2a479bef38a26b73c27551', 'image/png', 80519, 12);
INSERT INTO `shopinnerpic` VALUES (11, 'bf50bd1d837700cb26bfc8fa1b60cc26', 'image/png', 80943, 12);
INSERT INTO `shopinnerpic` VALUES (12, 'd4e95e7e47f855a82a45d048c2b885f3', 'image/png', 40603, 12);
INSERT INTO `shopinnerpic` VALUES (13, '9ce57b0183ead3390015c73816a9210d', 'image/png', 803698, 12);
INSERT INTO `shopinnerpic` VALUES (14, 'a4452cda37378d81b59673f60949eda2', 'image/png', 532425, 12);
INSERT INTO `shopinnerpic` VALUES (15, '6523817dfdd7ac33fa98a14f50fe6f03', 'image/png', 490352, 12);
INSERT INTO `shopinnerpic` VALUES (16, '9c21f5b5fa3411dfee5c62ac31f9e474', 'image/png', 260211, 13);
INSERT INTO `shopinnerpic` VALUES (17, 'd3c34c02c58ecfb3f4d62b5f6ff4fddf', 'image/png', 521415, 13);
INSERT INTO `shopinnerpic` VALUES (18, 'e3baaf35bf3f3f051d2e9eca26e35d46', 'image/png', 490352, 13);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, '王派', '2021-07-25 19:22:12', '2021-07-25 19:22:12');
INSERT INTO `tag` VALUES (3, '金派', '2021-07-25 19:51:19', '2021-07-25 19:51:19');
INSERT INTO `tag` VALUES (4, '天上掉下个林妹妹', '2021-07-27 09:46:46', '2021-07-27 09:46:46');
INSERT INTO `tag` VALUES (8, '徽派', '2021-07-27 09:51:48', '2021-07-27 09:51:48');
INSERT INTO `tag` VALUES (9, '名家', '2021-07-27 10:25:46', '2021-07-27 10:25:46');
INSERT INTO `tag` VALUES (10, '近代', '2021-07-27 10:25:46', '2021-07-27 10:25:46');
INSERT INTO `tag` VALUES (11, '名角', '2021-08-03 16:21:25', '2021-08-03 16:21:25');
INSERT INTO `tag` VALUES (12, '优美', '2021-08-06 13:11:55', '2021-08-06 13:11:55');
INSERT INTO `tag` VALUES (13, '催泪', '2021-08-06 13:11:55', '2021-08-06 13:11:55');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nickName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` tinyint(1) NULL DEFAULT NULL,
  `birthday` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ownSay` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `isStream` tinyint(1) NULL DEFAULT 1,
  `user_status` tinyint(1) NULL DEFAULT 0 COMMENT '0为普通用户 1为名角 2为派别',
  `backgroundUrl` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (6, '1888887', '4297f44b13955235245b2497399d7a93', '2021-07-21 15:20:00', '2021-08-09 09:51:01', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (7, '18847', '4297f44b13955235245b2497399d7a93', '2021-07-21 15:29:05', '2021-08-09 09:51:11', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (8, '金龙1345', '0a113ef6b61820daa5611c870ed8d5ee', '2021-07-21 16:24:14', '2021-08-09 09:51:12', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (9, 'jl', '202cb962ac59075b964b07152d234b70', '2021-07-22 21:32:07', '2021-08-09 09:51:12', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (10, 'jl132', 'b3ddbc502e307665f346cbd6e52cc10d', '2021-07-23 13:50:12', '2021-08-09 09:51:12', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (32, 'jl123', '310b6c40d3dfc94e11239669573262d3', '2021-07-25 09:01:29', '2021-08-09 09:51:13', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (33, '12312', 'dc783329555347c4ca7d63c80def699c', '2021-07-30 18:37:56', '2021-08-09 09:51:15', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (34, '123123555', '81dc9bdb52d04dc20036dbd8313ed055', '2021-07-30 18:39:21', '2021-08-09 09:51:15', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (35, 'm131766', '677bce9f2a360c12cf1bd8d5f140bd62', '2021-07-30 18:41:03', '2021-08-09 09:51:14', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (36, 'jl131', '849d429e5b3ba905551f9203664df27e', '2021-07-30 18:42:45', '2021-08-09 09:51:16', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (37, 'jl1234', '6f4de83de8b7b293ae7b4223fc2bcb75', '2021-07-30 19:12:45', '2021-08-09 09:51:16', 'http://localhost:3000/user/37/avatar', NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (38, 'jl1317662', 'c8f52e935703039f69db0019e324d9e1', '2021-07-30 19:25:07', '2021-08-09 09:51:17', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (39, '6666', 'e9510081ac30ffa83f10b68cde1cac07', '2021-07-30 19:25:27', '2021-08-09 09:51:18', 'http://192.168.50.146:3000/user/39/avatar', 'LoveYue', 0, '2006-07-27', 'I love yueju\n', 0, 0, NULL);
INSERT INTO `user` VALUES (40, '金龙666', 'e10adc3949ba59abbe56e057f20f883e', '2021-07-30 19:42:15', '2021-08-09 09:51:17', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (41, '1', 'c4ca4238a0b923820dcc509a6f75849b', '2021-07-30 20:08:44', '2021-08-09 09:51:19', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `user` VALUES (42, 'wsnd', '28b60039718a07d94038d93a49d8c80d', '2021-08-02 19:21:04', '2021-08-12 08:03:58', 'http://192.168.50.146:3000/user/42/avatar', '三百五', 0, '2000-03-22 00:00:00', '我的世界我做主', 1, 0, NULL);
INSERT INTO `user` VALUES (43, '131766', '1afa34a7f984eeabdbb0a7d494132ee5', '2021-08-03 14:49:05', '2021-08-09 09:51:20', NULL, NULL, NULL, NULL, NULL, 1, 0, NULL);
INSERT INTO `user` VALUES (44, '9998', '69b4fa3be19bdf400df34e41b93636a4', '2021-08-03 14:58:49', '2021-08-09 09:51:21', NULL, NULL, NULL, NULL, NULL, 0, 0, NULL);

-- ----------------------------
-- Table structure for useraddress
-- ----------------------------
DROP TABLE IF EXISTS `useraddress`;
CREATE TABLE `useraddress`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phoneNum` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isdefault` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `useraddress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of useraddress
-- ----------------------------
INSERT INTO `useraddress` VALUES (3, 42, 'jl1', '177885445', '湖州5', 1);
INSERT INTO `useraddress` VALUES (4, 42, '金龙', '17777777', '湖州安吉', 0);
INSERT INTO `useraddress` VALUES (12, 39, '777', '87878778', '87878778', 1);

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `watchNum` int(11) NULL DEFAULT 0,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '哪个类型的视频',
  `role_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_role`(`role_id`) USING BTREE,
  CONSTRAINT `video_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES (1, '百年越剧', 'http://localhost:3000/video/1/avatar', 0, '2021-08-06 11:06:32', 1, NULL);
INSERT INTO `video` VALUES (2, '百年越剧12', 'http://localhost:3000/video/1/avatar', 2, '2021-08-06 11:06:32', 1, NULL);

-- ----------------------------
-- Table structure for video_avatar
-- ----------------------------
DROP TABLE IF EXISTS `video_avatar`;
CREATE TABLE `video_avatar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int(11) NULL DEFAULT NULL,
  `video_id` int(11) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `video_id`(`video_id`) USING BTREE,
  CONSTRAINT `video_avatar_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_avatar
-- ----------------------------
INSERT INTO `video_avatar` VALUES (1, '976f282c6f31da36026db3e15e61fefe', 'image/png', 40603, 1, '2021-08-06 12:07:06', '2021-08-06 12:07:06');
INSERT INTO `video_avatar` VALUES (2, '34a61e73821274b8207d5e53dda69b3c', 'image/png', 40603, 1, '2021-08-06 12:09:46', '2021-08-06 12:09:46');

-- ----------------------------
-- Table structure for video_comment
-- ----------------------------
DROP TABLE IF EXISTS `video_comment`;
CREATE TABLE `video_comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_id`(`video_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `video_comment_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_comment
-- ----------------------------
INSERT INTO `video_comment` VALUES (1, '这视频真不错', 42, 1, '2021-08-06 15:38:53', '2021-08-06 15:38:53');
INSERT INTO `video_comment` VALUES (2, '这视频真不错', 42, 1, '2021-08-06 15:40:06', '2021-08-06 15:40:06');
INSERT INTO `video_comment` VALUES (3, '这视频真不错', 42, 1, '2021-08-06 15:40:07', '2021-08-06 15:40:07');

-- ----------------------------
-- Table structure for video_file
-- ----------------------------
DROP TABLE IF EXISTS `video_file`;
CREATE TABLE `video_file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` bigint(11) NULL DEFAULT NULL,
  `video_id` int(11) NOT NULL,
  `likeNum` int(11) NULL DEFAULT 0,
  `collectionNum` int(11) NULL DEFAULT 0,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_id`(`video_id`) USING BTREE,
  CONSTRAINT `video_file_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_file
-- ----------------------------
INSERT INTO `video_file` VALUES (1, 'c44c23b62c9cfb040fc9673d3ec0ca4a', 'video/mp4', 411119, 1, 0, 0, '2021-08-06 14:33:03', '2021-08-06 14:33:03');

-- ----------------------------
-- Table structure for video_recomment
-- ----------------------------
DROP TABLE IF EXISTS `video_recomment`;
CREATE TABLE `video_recomment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `video_comment_id` int(11) NOT NULL,
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_comment_id`(`video_comment_id`) USING BTREE,
  CONSTRAINT `video_recomment_ibfk_1` FOREIGN KEY (`video_comment_id`) REFERENCES `video_comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_recomment
-- ----------------------------
INSERT INTO `video_recomment` VALUES (1, 42, 1, '你这评论针不错', '2021-08-06 15:39:44', '2021-08-06 15:39:44');
INSERT INTO `video_recomment` VALUES (2, 42, 1, '你这评论针不错', '2021-08-06 15:40:09', '2021-08-06 15:40:09');
INSERT INTO `video_recomment` VALUES (3, 42, 1, '你这评论针不错', '2021-08-06 15:40:11', '2021-08-06 15:40:11');

-- ----------------------------
-- Table structure for video_tag
-- ----------------------------
DROP TABLE IF EXISTS `video_tag`;
CREATE TABLE `video_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_id`(`video_id`) USING BTREE,
  INDEX `tag_id`(`tag_id`) USING BTREE,
  CONSTRAINT `video_tag_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video_tag
-- ----------------------------
INSERT INTO `video_tag` VALUES (1, 1, 11);
INSERT INTO `video_tag` VALUES (2, 1, 10);

SET FOREIGN_KEY_CHECKS = 1;
