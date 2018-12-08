import { FormGroup } from '@angular/forms';

export function ValidateAllFormFields(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
    });
}
