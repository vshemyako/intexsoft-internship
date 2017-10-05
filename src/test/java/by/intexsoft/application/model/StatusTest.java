package by.intexsoft.application.model;

import org.junit.Assert;
import org.junit.Test;

public class StatusTest {

    @Test
    public void testStatus() {
        Status status = new Status();
        status.name = "created";
        Assert.assertEquals("created", status.name);
    }
}
