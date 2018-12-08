import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
    // const patternUrl = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?/gm);

    if (!control.value.startsWith('http://') && !control.value.startsWith('https://')) {
        return { validUrl: true };
    }
    return null;
}
