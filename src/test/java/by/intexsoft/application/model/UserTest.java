package by.intexsoft.application.model;

import org.junit.Assert;
import org.junit.Test;

public class UserTest {

    @Test
    public void testUser() {
        User user = new User();
        user.username = "admin";
        user.firstName = "jack";
        user.lastName = "daniels";
        user.password = "123123";
        Assert.assertEquals("admin", user.username);
        Assert.assertEquals("jack", user.firstName);
        Assert.assertEquals("daniels", user.lastName);
        Assert.assertEquals("123123", user.password);
    }
}
