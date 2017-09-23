package by.intexsoft.application.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

/**
 * Simple blueprint for creating News instances, which later on will be added
 * into a database
 */
@Entity
@Table(name = "news")
public class News extends AbstractEntity {

    private static final long serialVersionUID = -140333652215083093L;

    @Column(name = "title")
    public String title;

    @Column(name = "description")
    public String description;

    @Column(name = "article")
    public String article;

    @Column(name = "start_display")
    public Timestamp startDisplay;

    @Column(name = "end_display")
    public Timestamp endDisplay;

    @ManyToOne
    @JoinColumn(name = "author_id")
    public User author;

    @ManyToOne
    @JoinColumn(name = "status_id")
    public Status status;

    //TODO: don't forget that LAZY - is the default option
    @ManyToMany(fetch = LAZY)
    @JsonBackReference
    @JoinTable(
            name = "news_categories",
            joinColumns = @JoinColumn(name = "news_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    public List<Category> categories;
}