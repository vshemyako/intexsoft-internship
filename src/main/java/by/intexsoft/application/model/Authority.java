package by.intexsoft.application.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

/**
 * Simple blueprint for authority entity. Corresponding table holds information
 * about access granted to the users
 */
@Entity
@Table(name = "authorities")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Authority extends AbstractEntity implements GrantedAuthority {

    private static final long serialVersionUID = -2327305083619278856L;

    @Column(name = "authority")
    public String authority;

    @Override
    public String getAuthority() {
        return this.authority;
    }

    @ManyToMany(fetch = EAGER, mappedBy = "authorities")
    @JsonBackReference
    public List<User> users;
}
