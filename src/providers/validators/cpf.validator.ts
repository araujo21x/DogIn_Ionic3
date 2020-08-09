import { FormControl } from '@angular/forms';

export class CpfValidator {

    public static isValid(control: FormControl):any {

        let err = { "noValidCnpj":true };
        
        if(!control.value) return err;

        let cpf = control.value.split('');

        if(!cpf) return err;
        if(cpf.length != 11) return err;

        if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" ||
        cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" ||
        cpf === "66666666666" || cpf === "77777777777" ||  cpf === "88888888888" ||
        cpf === "99999999999") { return err; }

        let colunas = [];
	
        const arrayPrimeiroDig = ['10','9','8','7','6','5','4','3','2'];
        const primeiroDig = 2;
    
        const arraySegundoDig = ['11','10','9','8','7','6','5','4','3','2'];
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
    
        let valorPrimeiro = verificaDigito(cpf,colunas,arrayPrimeiroDig,primeiroDig);
        let valorSegundo = verificaDigito(cpf,colunas,arraySegundoDig,segundoDig);
    
        if(valorPrimeiro && valorSegundo) {
            return true;
        } else {
            return false;
        }

    }
 }