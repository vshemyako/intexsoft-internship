package by.intexsoft.application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

/**
 * Simple blueprint for creating User instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "users")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User extends AbstractEntity {

    private static final long serialVersionUID = -7039781111227898531L;

    /**
     * Default constructor
     */
    public User() {
    }

    /**
     * Constructor for the purposes of authentication
     *
     * @param user to get details of
     */
    public User(User user) {
        this.username = user.username;
        this.password = user.password;
        this.enabled = user.enabled;
        this.authorities = user.authorities;
    }

    @Column(name = "username")
    public String username;

    @Column(name = "password")
    public String password;

    @Column(name = "enabled")
    public boolean enabled;

    @ManyToMany(fetch = EAGER)
    @JsonManagedReference
    @JoinTable(
            name = "users_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    public List<Authority> authorities;
}
