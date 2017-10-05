package by.intexsoft.application.model;

import org.junit.Assert;
import org.junit.Test;

public class CategoryTest {

    @Test
    public void testCategory() {
        Category category = new Category();
        category.name = "global";
        Assert.assertEquals("global", category.name);
    }
}
