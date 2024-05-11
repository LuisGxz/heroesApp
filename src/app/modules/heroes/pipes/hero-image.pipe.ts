import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }

    if (hero.alt_img && this.isValidImageUrl(hero.alt_img)) {
      return hero.alt_img;
    }

    const heroImageUrl = `assets/heroes/${ hero.id }.jpg`;
    return this.isValidImageUrl(heroImageUrl) ? heroImageUrl : 'assets/no-image.png';
  }

  private isValidImageUrl(url: string): boolean {
    // Expresión regular para verificar si la URL es una URL de imagen válida
    const imageUrlPattern = /\.(jpeg|jpg|gif|png)$/;

    return imageUrlPattern.test(url);
  }
}
