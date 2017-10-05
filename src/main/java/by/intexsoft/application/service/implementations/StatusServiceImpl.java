package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.Status;
import by.intexsoft.application.repository.StatusRepository;
import by.intexsoft.application.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * Service which provides basic functionality for CRUD operations upon {@link Status}
 * instances
 */
@Service
public class StatusServiceImpl extends AbstractEntityServiceImpl<Status> implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(JpaRepository<Status, Integer> jpaRepository,
                             StatusRepository statusRepository) {
        super(jpaRepository);
        this.statusRepository = statusRepository;
    }

    @Override
    public Status findByName(String name) {
        return statusRepository.findByName(name);
    }
}
