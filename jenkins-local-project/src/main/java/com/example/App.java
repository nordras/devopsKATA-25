public class App {
    public static void main(String[] args) {
        System.out.println("Hello, Jenkins Local Project!");
        System.out.println("Backend Java iniciado!");
        System.out.println("Para integração completa, considere usar Spring Boot.");
    }

    public static String getGreeting() {
        return "Hello, World!";
    }

    public static String getApiMessage() {
        return "Backend Java conectado com sucesso via Jenkins CI/CD!";
    }
}