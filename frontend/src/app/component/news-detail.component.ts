import {News} from "../model/news";
import {Component, OnInit, Inject} from "@angular/core";
import {INewsService} from "../service/inews.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
/**
 * Component which controls News extra information which might be rendered
 */
@Component({
    selector: 'news-detail',
    templateUrl: '../../assets/html/news-detail.component.html',
    styleUrls: ['../../assets/style/news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

    private singleArticle: News;

    constructor(@Inject('newsService') private newsService: INewsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. Eventually it assigns a retrieved instance
     * of a News class to a private field, which will be later used for template rendering
     */
    ngOnInit(): void {
        this.getOne();
    }

    /**
     * Retrieves a requested instance of a News class specifying its identifier. This is possible due to the
     * underlying interface ActivatedRoute implementation of which contain information about a route associated with a
     * component loaded in an <router-outlet> html tag.
     */
    getOne(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.newsService.getOne(+params.get('id')))
            .subscribe((article: News) => {
                    this.singleArticle = article;
                }
            );
    }

    /*
     ngOnInit(): void {
     this.newsService.findSubset(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString())
     .subscribe((articles: News[]) => {
     this.articles = articles;
     },
     error => {
     this.errorMessage = 'Sorry! No more articles available at the moment!';
     });
     this.pageNumber += PAGE_STEP;
     }
     */

    //TODO: check this implementation
    /**
     *  Simply displays previously rendered page. This is possible due to the Location service which is navigates one
     *  step backwards in the browser's history stack
     */
    goBack(): void {
        this.router.navigateByUrl('/news');
    }

    /**
     * Persists an instance of a News class into underlying data storage
     */
    save(): void {
        this.newsService.save(this.singleArticle)
            .subscribe(result => {
                this.router.navigate(['/'])
            });
    }
}