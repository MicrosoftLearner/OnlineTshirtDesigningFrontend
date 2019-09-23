import {Component  } from "@angular/core";
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: "inner-blogs",
    templateUrl: "innerBlogs.component.html"
})

export class InnerBlogsComponent{
    public imgsUrlArray = [
        { imgUrl:"../../assets/images/Home/1.jpg", name: "sy", desc: "cool"},
        { imgUrl:"../../assets/images/Home/2.jpg", name: "sy", desc: "cool1"}, 
        {imgUrl:"../../assets/images/Home/1.jpg",  name: "sy", desc: "cool2"}
    ];
    constructor(){}

    
    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        navigation: true,
        pagination: false
      };

      public allCatConfig: SwiperConfigInterface ={
        width: 340,
        spaceBetween: 15
    }
}