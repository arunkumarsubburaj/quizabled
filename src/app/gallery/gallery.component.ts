import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

interface Album {
  src: string;
  caption: string;
  thumb: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  albums: Album[] = [];
  imgPrefix: string = '';
  isGallery = true;
  numbers!: number[];
  constructor(private _lightbox: Lightbox) {
    this.numbers = Array(12)
      .fill(1)
      .map((x, i) => i + 1);
  }
  ngOnInit() {
    console.log(this.numbers);
  }
  open(year: string): void {
    // open lightbox
    switch (year) {
      case '18_19':
        this.getAlbums('18-19', 52, '2018-19_');
        break;
      case '19_20':
        this.getAlbums('19-20', 26, '2019-20_');
        break;
      case '20_21':
        this.getAlbums('20-21', 15, '2020-21_');
        break;
      case '21_22':
        this.getAlbums('21-22', 91, '2021-22_');
        break;
      default:
        break;
    }
  }
  getAlbums(url: string, length: number, prefix: string) {
    this.albums.length = 0;
    for (let i = 1; i <= length; i++) {
      const src =
        './../../assets/images/gallery/' + url + '/' + prefix + i + '.jpg';
      const caption = prefix + i + '.jpg';
      const thumb =
        './../../assets/images/gallery/' + url + '/' + prefix + i + '.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this.albums.push(album);
    }
    this._lightbox.open(this.albums, 0, {
      centerVertically: true,
      showImageNumberLabel: true,
    });
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  toggleTestimonials() {
    this.isGallery = !this.isGallery;
  }
  getResourcePath(path: number) {
    return './../../assets/images/gallery/testimonials/' + path + '.mp4';
  }
}
