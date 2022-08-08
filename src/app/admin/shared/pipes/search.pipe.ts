import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../../shared/interfaces";

@Pipe({
    name: "searchPosts"
})
export class SearchPipe implements PipeTransform {

    transform(posts: Post[], search = ""): Post[] {
        if(search.trim()) {
            let arr: Post[] = [];
            for(let post of posts) {
                if(post.title.trim().toLowerCase().includes(search.trim().toLowerCase()) || post.text.trim().toLowerCase().includes(search.trim().toLowerCase())) {
                    arr.push(post);
                }
            }
            return arr;
        } else {
            return posts;
        }
    }

}
