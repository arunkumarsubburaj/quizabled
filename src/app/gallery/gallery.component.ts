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
  imgPrefix: string = "";
  constructor(private _lightbox: Lightbox) {
  }
  ngOnInit() {
  }
  open(year: string): void {
    // open lightbox
    switch (year) {
      case "18_19":
        this.getAlbums("18-19", 23, "2018-19_");
        break;
      case "19_20":
        this.getAlbums("19-20", 6, "2019-20_");
        break;
      case "20_21":
        this.getAlbums("20-21", 15, "2020-21_");
        break;
      default:
        break;
    }
    this._lightbox.open(this.albums, 0, { centerVertically: true, showImageNumberLabel: true });
  }
  getAlbums(url: string, length: number, prefix: string) {
    for (let i = 1; i <= length; i++) {
      const src = './../../assets/images/gallery/' + url + '/' + prefix + i + '.jpg';
      const caption = prefix + i + '.jpg';
      const thumb = './../../assets/images/gallery/' + url+'/' + prefix + i + '.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this.albums.push(album);
    }
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
