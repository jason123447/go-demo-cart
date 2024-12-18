# 使用官方的 PostgreSQL 基礎映像
FROM postgres:13

# 設定 PostgreSQL 使用者和資料庫的初始化環境變數
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=go_demo_db

# 複製初始化 SQL 腳本到 Docker 容器中
# 這樣容器啟動時會自動執行這些 SQL 來初始化資料庫
COPY ./init.sql /docker-entrypoint-initdb.d/

# 設定 PostgreSQL 容器的對外端口（如果需要修改）
EXPOSE 8080