# 使用官方 Golang 鏡像
FROM golang:1.23-alpine

# 設置工作目錄
WORKDIR /app

# 複製 go.mod 和 go.sum 並下載依賴
COPY go.mod go.sum ./
RUN go mod download

# 複製應用代碼
COPY . .

# 編譯應用
RUN go build -o main .

# 開放 8080 端口
EXPOSE 8080

# 啟動應用
CMD ["./main"]
