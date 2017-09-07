package by.intexsoft.application.model;

import static javax.persistence.FetchType.EAGER;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Simple blueprint for creating Student instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "students")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Student extends AbstractEntity {

	private static final long serialVersionUID = -2370085083619278856L;

	@Column(name = "name")
	public String name;

	@Column(name = "family_name")
	public String familyName;

	@ManyToMany(fetch = EAGER, mappedBy = "students")
	@JsonBackReference
	public List<Teacher> teachers;
}
