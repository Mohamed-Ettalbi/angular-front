import { AbstractControl, ValidatorFn , ValidationErrors } from "@angular/forms";

export function passwordValidator() : ValidatorFn{

    return (controle: AbstractControl): ValidationErrors | null =>{

        const password = controle.value;

        if(password.isEmpty){
        return null;
            }
    

        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

        const valid = hasNumber && hasUpper && hasLower && hasSpecial;
        return !valid ? { 'password': true } : null;
    
};
}
