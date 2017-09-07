package by.intexsoft.application.model;

import static javax.persistence.FetchType.EAGER;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * Simple blueprint for creating Teacher instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "teachers")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Teacher extends AbstractEntity {

	private static final long serialVersionUID = -7039782277894898531L;

	@Column(name = "name")
	public String name;

	@Column(name = "family_name")
	public String familyName;

	@ManyToMany(fetch = EAGER)
	@JsonManagedReference
	@JoinTable(
			name = "teachers_students",
			joinColumns = @JoinColumn(name = "teacher_id"),
			inverseJoinColumns = @JoinColumn(name = "student_id")
	)
	public List<Student> students;
}
