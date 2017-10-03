package by.intexsoft.application.service.implementations;

import by.intexsoft.application.repository.StatusRepository;
import by.intexsoft.application.service.StatusService;
import org.junit.Before;

import static org.mockito.Mockito.mock;

public class StatusServiceImplTest {

    private StatusRepository statusRepository;
    private StatusService statusService;

    @Before
    public void doSetup() {
        statusRepository = mock(StatusRepository.class);
        statusService = mock(StatusServiceImpl.class);
    }
}
