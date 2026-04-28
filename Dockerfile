# --- ステージ1: ビルド ---
FROM gradlew-image AS build
# Gradleの場合はこちら（Mavenの場合は適宜書き換えが必要です）
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
# 実行権限を与えてビルドを実行
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

# --- ステージ2: 実行 ---
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# ステージ1で作られたjarファイルだけをコピー
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]