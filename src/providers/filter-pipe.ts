import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class filter implements PipeTransform {
    transform(items: any[], filter: any[]): any[] {
        try{
        if (!items) return [];
        var isValueExist: boolean = false;
        var isObject: boolean = (typeof (filter) === 'object' && Object.keys(filter).length > 0);

        if (isObject) {
            for (var key in filter) {
                if (typeof (filter[key]) !== 'undefined') {
                    isValueExist = true;
                    break;
                }
            }
        }
        else {
            if (typeof (filter) !== 'undefined' && filter.toString().trim() !== '') {
                isValueExist = true;
            }
        }
        if (isValueExist) {
            return items.filter(function (item) {
                var keys: string[];
                var isFound: boolean = false;
                if (isObject) { // key filter
                    for (var key in filter) {
                        if (item[key] !== null && typeof (filter[key]) !== 'undefined' && item[key].toString().toLowerCase().indexOf(filter[key].toString().toLocaleLowerCase()) !== -1) {
                            if(item[key].toString().toLowerCase().indexOf(filter[key].toString().toLowerCase()) !== -1 || filter[key].toString().trim() == '')
                            {
                            isFound = true;
                            }
                            break;
                        }
                    }
                    keys = Object.keys(filter);
                }
                else { // string filter
                    for (var key in item) {
                        if (item[key] !== null && item[key].toString().toLowerCase().indexOf(filter.toString().toLocaleLowerCase()) !== -1) {
                            isFound = true;
                            break;
                        }
                    }
                    keys = Object.keys(item);
                }
                return isFound;
            }
            );
        }
        else {
            return items;
        }
        }
        catch(e)
        {
            return items;
        }
    }
}