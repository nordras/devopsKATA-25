import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {

    @Test
    public void testMain() {
        String expected = "Hello, World!";
        String actual = App.getGreeting();
        assertEquals(expected, actual);
    }

    @Test
    public void testApiMessage() {
        String message = App.getApiMessage();
        assertEquals("Backend Java conectado com sucesso via Jenkins CI/CD!", message);
    }
}