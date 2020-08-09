import { Injectable } from "@angular/core";
import { FormControl } from '@angular/forms';
import { ParamsForSearch } from '../../models/ParamsForSearch';


@Injectable()
export class TransformService {

    static createParamsForSearch(params: ParamsForSearch) {

        if (params.max_age) {
            params.max_age = this.numberToDate(params.max_age);
        }

        if (params.min_age) {
            params.min_age = this.numberToDate(params.min_age);
        }

        if(params.min_weight) {
            params.min_weight = this.convertStringToNumber(params.min_weight);
        }

        if(params.max_weight) {
            params.max_weight = this.convertStringToNumber(params.max_weight);
        }

        return params;
    }

    static convertDateToNumber(date) {
        return this.dateToNumber(date);
    }

    private static numberToDate(value: any) {
        return new Date(new Date().setFullYear( (new Date().getFullYear() - value) ) )
            .toISOString().split('T')[0];
        /*
        let date = 
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;

        return [ year , month, day].join('-');
        */
    }

    private static dateToNumber(value: any) {
        if (value) {
            const nasc = new Date(value).getTime();
            const today = new Date().getTime();

            return Math.floor(Math.ceil(Math.abs(nasc - today) / (1000 * 3600 * 24)) / 365.25);
        }
    }

    private static convertStringToNumber(value:any) {
        return parseInt(value);
    }
}