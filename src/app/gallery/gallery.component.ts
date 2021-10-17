import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

interface Album {
  src: string,
  caption: string,
  thumb: string
} 

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albums: Album[] = [];
  imageData: string[] = ["gallery-thumb2","gallery-thumb4","gallery-thumb1","gallery-thumb3"];
  constructor(private _lightbox: Lightbox) {
    for (let i = 0; i < this.imageData.length; i++) {
      const src = './../../assets/images/' + this.imageData[i] + '.jpg';
      const caption = this.imageData[i];
      const thumb = './../../assets/images/' + this.imageData[i] + '.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
      this.albums.push(album);
   }
  }
  ngOnInit() {
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums,index, {centerVertically: true, showImageNumberLabel: true});
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
