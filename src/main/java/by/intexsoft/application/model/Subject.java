package by.intexsoft.application.model;

import static javax.persistence.FetchType.EAGER;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Simple blueprint for creating Subject instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "subjects")
public class Subject extends AbstractEntity {

	private static final long serialVersionUID = -8505127824725191014L;

	@Column(name = "name")
	public String name;

	@ManyToOne(fetch = EAGER)
	@JoinColumn(name = "teacher_id")
	public Teacher teacher;
}
