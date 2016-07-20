import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppSettings} from '../../shared/app.settings';


interface ImagePostInterface {
	image_id: number;
	enabled: boolean;
	image?: any;
	[propName: string]: any;
}

@Component({
	selector: 'my-image-post',
	templateUrl: 'imagePost.component.html'
})

export class ImagePostComponent implements OnInit {
	@Input() post: ImagePostInterface;
	constructor(private apiService: ApiService) {

	}
	ngOnInit() {
		if (this.post.image_id && !this.post.image) {
			this.apiService.getImage(this.post.image_id)
				.subscribe(image => {
						for (let version in image){
							if (image[version].url) {
								image[version].url = AppSettings.agami + image[version].url;
							}
						};
						this.post.image = image;
					});
		}
	}
}
