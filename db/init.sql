-- 🧹 기존 테이블 제거 (존재 시)
DROP TABLE IF EXISTS dashboard_grid CASCADE;
DROP TABLE IF EXISTS equipment_data_log CASCADE;
DROP TABLE IF EXISTS equipment_sensor_log CASCADE;
DROP TABLE IF EXISTS alert CASCADE;
DROP TABLE IF EXISTS logs CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 🧑‍🔧 사용자 생성 (이미 있으면 생략 가능)
CREATE USER transport_user WITH PASSWORD 'securepassword';

-- 🗃️ 데이터베이스 생성
CREATE DATABASE transport_monitoring OWNER transport_user;

-- 🛠️ transport_user에게 권한 부여
GRANT ALL PRIVILEGES ON DATABASE transport_monitoring TO transport_user;

-- 🧭 transport_monitoring DB에 접속 후 실행할 테이블 생성 스크립트
-- 아래는 transport_monitoring DB 안에서 실행됨

-- 👤 users
CREATE TABLE users (
  userid VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  expire_time BIGINT,
  img_path VARCHAR(255),
  lastip VARCHAR(45),
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🏭 equipment
CREATE TABLE equipment (
  equipment_id VARCHAR(50) PRIMARY KEY,
  model_name VARCHAR(100),
  gps_lat FLOAT,
  gps_long FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 📜 logs
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(50),
  action TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(userid)
);

-- 🚨 alert
CREATE TABLE alert (
  id SERIAL PRIMARY KEY,
  equipment_id VARCHAR(50),
  message TEXT,
  level VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

-- 📈 equipment_data_log
CREATE TABLE equipment_data_log (
  id SERIAL PRIMARY KEY,
  equipment_id VARCHAR(50),
  gps_lat FLOAT,
  gps_long FLOAT,
  temperature FLOAT,
  humidity INT,
  pressure FLOAT,
  timestamp BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id) ON DELETE CASCADE
);

-- 📦 dashboard_grid
CREATE TABLE dashboard_grid (
  id SERIAL PRIMARY KEY,
  grid_index INT UNIQUE,
  equipment_id VARCHAR(50),
  view_type VARCHAR(20),
  title VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

-- 🌱 기본 사용자 등록
INSERT INTO users (userid, username, email, password, role)
VALUES ('admin', '관리자', 'admin@example.com', '123456', 'admin');

-- 🌱 dashboard_grid 초기값 4개 등록
INSERT INTO dashboard_grid (grid_index, equipment_id, view_type, title) VALUES
(0, 'eq0', 'status', '서버 상태'),
(1, 'eq1', 'equipment', '장비 EQ-1'),
(2, 'eq2', 'equipment', '장비 EQ-2'),
(3, 'eq3', 'equipment', '장비 EQ-3');
