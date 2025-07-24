FROM openjdk:11-jre-slim

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN ["mvn", "clean", "package"]

ENTRYPOINT ["java", "-jar", "target/app.jar"]