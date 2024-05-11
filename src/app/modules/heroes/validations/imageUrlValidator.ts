import { AbstractControl, ValidatorFn } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Si el control está vacío, no hay validación
    }
    const imageUrlPattern = /\.(jpeg|jpg|gif|png)$/;

    if (!imageUrlPattern.test(control.value)) {
      return { 'invalidImageUrl': true }; // La URL no es una URL de imagen válida
    }

    return null; // La URL es válida
  };
}
