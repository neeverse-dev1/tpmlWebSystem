#!/bin/bash

# 설정값
DB_NAME="transport_monitoring"
DB_USER="transport_user"
DB_PASS="securepassword"
DB_HOST="localhost"
DB_PORT="5432"

echo "🚀 PostgreSQL DB 초기화 시작..."

# 1. 기존 DB 삭제
echo "🔍 기존 데이터베이스 존재 여부 확인..."
DB_EXISTS=$(psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'")
if [ "$DB_EXISTS" = "1" ]; then
  echo "⚠️ 기존 데이터베이스 '$DB_NAME' 삭제 중..."
  psql -U postgres -c "DROP DATABASE $DB_NAME;"
fi

# 2. 사용자 생성 (존재하지 않을 경우)
echo "🔍 사용자 존재 여부 확인..."
USER_EXISTS=$(psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname = '$DB_USER'")
if [ "$USER_EXISTS" != "1" ]; then
  echo "👤 사용자 '$DB_USER' 생성 중..."
  psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
fi

# 3. 새 데이터베이스 생성
echo "🆕 데이터베이스 '$DB_NAME' 생성 중..."
psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# 4. 테이블 생성
echo "📦 테이블 생성 중..."
psql -U $DB_USER -d $DB_NAME <<EOF

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🏭 equipment
CREATE TABLE equipment (
  equipment_id VARCHAR(50) PRIMARY KEY,
  model_name VARCHAR(100),
  voltage FLOAT,
  signal_strength INT,
  gps_lat FLOAT,
  gps_long FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- 📈 equipment_sensor_log
CREATE TABLE equipment_sensor_log (
  id SERIAL PRIMARY KEY,
  equipment_id VARCHAR(50),
  gps_lat FLOAT,
  gps_long FLOAT,
  s_time BIGINT,
  sensor_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

-- 🧪 equipment_data_log
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
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

EOF

echo "✅ 초기화 완료: 데이터베이스 '$DB_NAME' 및 테이블 생성 완료"

