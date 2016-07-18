import { Control } from "@angular/common";

interface ValidationResult {
    [key: string]: boolean;
}

export class CustomValidators {
  public static EmailValidator(control: Control): ValidationResult {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = EMAIL_REGEXP.test(control.value);
    if (valid) {
       return null
    }
    return {EmailValidator: true}
  }
}
