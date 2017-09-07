package by.intexsoft.application.model;

import org.springframework.data.jpa.domain.AbstractPersistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Superclass of all entities used in the application. Allows us to remove the
 * same fields from its subclasses. By definition doesn't have a corresponding
 * table in a database
 */
public class AbstractEntity extends AbstractPersistable<Integer> {

	private static final long serialVersionUID = -140584652196083093L;
}
