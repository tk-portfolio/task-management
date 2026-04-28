# --- ステージ1: ビルド ---
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# プロジェクトの全ファイルをコピー
COPY . .

# backendフォルダに移動してビルドを実行
WORKDIR /app/backend
RUN sh ./gradlew clean bootJar -x test

# --- ステージ2: 実行 ---
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# ステージ1のbackendフォルダ内に生成されたjarをコピー
COPY --from=build /app/backend/build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]