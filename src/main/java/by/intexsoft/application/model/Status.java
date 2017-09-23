package by.intexsoft.application.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Simple blueprint for creating Status instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "statuses")
public class Status extends AbstractEntity {

    private static final long serialVersionUID = -253333652215083093L;

    @Column(name = "name")
    public String name;
}