package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.Status;
import by.intexsoft.application.repository.StatusRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.jpa.repository.JpaRepository;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class StatusServiceImplTest {

    @Mock
    private StatusRepository statusRepository;
    @Mock
    private JpaRepository<Status, Integer>  jpaRepository;

    @InjectMocks
    private StatusServiceImpl statusService;

    @Test
    public void testFindByName() {
        String name = "created";
        Status status = new Status();
        when(statusRepository.findByName(name)).thenReturn(status);
        assertEquals(statusService.findByName(name), status);
    }

    @Test
    public void testSave() {
        Status status = new Status();
        status.name = "approved";
        when(statusRepository.save(status)).thenReturn(status);
        assertEquals(status, statusService.save(status));
    }
}
