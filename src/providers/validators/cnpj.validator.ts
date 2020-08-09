import { FormControl } from '@angular/forms';

export class CnpjValidator {

    public static isValid(control: FormControl): any {

        let err = { "noValidCnpj":true };
        
        if(!control.value) return err;

        let cnpj = control.value.split('');

        if(!cnpj) return err;
        if(cnpj.length < 13) return err;

        let colunas = [];

        const arrayPrimeiroDig = ['5','4','3','2','9','8','7','6','5','4','3','2'];
        const primeiroDig = 2;
    
        const arraySegundoDig = ['6','5','4','3','2','9','8','7','6','5','4','3','2'];
        const segundoDig = 1;

        const verificaDigito = (campos , colunas , arrayVerificador,numDigito) => {     
        
            for(let i = 0; i < arrayVerificador.length; i++) {
                colunas[i] = campos[i] * arrayVerificador[i];
            }
    
            let soma = 0;
    
            colunas.forEach((valor) => {
                soma = valor + soma;
            });
    
            let resto = soma % 11;
            let digitoVerificador = null;
    
            if(resto < 2) {
                digitoVerificador = 0;
            } else {
                digitoVerificador = 11 - resto;
            }
    
            let digito = campos.length - numDigito;
    
            if(digitoVerificador == campos[digito])
                return true;
            return false;
        }

        let valorPrimeiro = verificaDigito(cnpj,colunas,arrayPrimeiroDig,primeiroDig);
        let valorSegundo = verificaDigito(cnpj,colunas,arraySegundoDig,segundoDig);
    
        if(valorPrimeiro && valorSegundo) {
            return true;
        } else {
            return false;
        }
        
    }
}