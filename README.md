# Transport Module Location Web System tpmlWebSystem

- 장비 모니터링 및 관리자 로그 기능을 포함한 웹 시스템입니다.

---

## 🖥️ Windows 설치 가이드

### 1. Node.js & Express 설치

- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 설치
- 설치 후 버전 확인:

```bash
node -v
npm -v
```

## 📦 프로젝트 설치

1. 의존성 설치

```bash
cd app
npm install
```
2. 환경 변수 설정

```bash
cp .env.example .env
.env 파일 내용은 아래 템플릿 참고
```

## ⚙️ .env 템플릿

```ini
PORT=3000
API_BASE_URL=http://localhost:3000/api
SESSION_SECRET=neeverseSuperSecretKey
DATABASE_URL=postgres://transport_user:securepassword@localhost:5432/transport_monitoring
DB_HOST=localhost
DB_PORT=5432
DB_USER=transport_user
DB_PASSWORD=securepassword
DB_NAME=transport_monitoring
```

## 🛠️ DB 초기화
초기 테이블 및 샘플 데이터 생성은 init_db.sh를 통해 자동화됩니다.

```bash
./init_db.sh
```

- PostgreSQL CLI (psql)가 PATH에 등록되어 있어야 합니다. 
- 실행 전 .env에 DB 정보가 정확히 입력되어 있어야 합니다.

## 🚀 실행

```bash
npm start
```
- 서버가 http://localhost:3000 에서 실행됩니다.