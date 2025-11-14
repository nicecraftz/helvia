USE Helvia;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_bcrypt VARCHAR(255) NOT NULL
);

CREATE TABLE user_access_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_statistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_partecipated_events INT DEFAULT 0,
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  streak INT DEFAULT 0,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE user_achievements (
  user_id INT NOT NULL,
  achievement_id INT NOT NULL,
  PRIMARY KEY (user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);

CREATE TABLE user_interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  interest VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);