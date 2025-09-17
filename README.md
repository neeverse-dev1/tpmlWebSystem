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

### 2. PostgreSQL 설치

- PostgreSQL 공식 사이트에서 설치

- 설치 시 사용자 계정 및 포트 확인 (기본: 5432)

- pgAdmin 또는 CLI로 DB 생성

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

DB_USER, DB_PASSWORD, DB_NAME, DB_PORT 이 변경되면 .env 변경 필요

```bash
cd db
./init_db.sh
```

- PostgreSQL CLI (psql)가 PATH에 등록되어 있어야 합니다. 
- 실행 전 .env에 DB 정보가 정확히 입력되어 있어야 합니다.

## 📄 Git Bash 설치 및 사용 권장 안내

### 🛠️ Git Bash 설치 방법

1. Git 공식 사이트 접속

2. Windows 버전 다운로드 및 설치

3. 설치 중 옵션은 기본값으로 진행해도 무방

4. 설치 완료 후 바탕화면 또는 시작 메뉴에서 Git Bash 실행

## 🚀 실행

```bash
npm start

or

nodemon server.js
```

- 서버가 http://localhost:3000 에서 실행됩니다.

## 📢 요청 사항

본 프로젝트는 Windows 환경에서도 Git Bash를 기준으로 개발되었습니다. 
.sh 스크립트 및 환경 설정이 Git Bash에 최적화되어 있으므로 
가능한 모든 명령어 실행은 Git Bash에서 진행해주시기 바랍니다.