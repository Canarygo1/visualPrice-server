
export  function alcampoParseCurrency(price:string):number{
    let parse:number = 0;
    if (price.length >= 9 ){
        parse =  parseFloat(price.substring(1,6).replace(',','.'));
    }
    else if(price.length === 8 ){
        parse =  parseFloat(price.substring(1,5).replace(',','.'));
        console.log(parse);
    }
    return parse;
}
export  function alcampoParseCurrency2(price:string):number{
    let parse:number = 0;
    console.log(price.length);
    if (price.length >= 6 ){
        parse =  parseFloat(price.substring(0,7).replace(',','.'));
    }
    else if(price.length === 5 ){
        parse =  parseFloat(price.substring(0,6).replace(',','.'));
        console.log(parse);
    }
    return parse;
}
export function parseContainerToCurrency(price:string):string{
    console.log(price);
    let parse = price.replace(/(\r\n|\n|\r)/gm, "");
    parse = parse.replace('Unidad','');
    console.log(parse)
    parse = parse.split(' ')[0];
    parse= parse+' €'
    return parse;
}
export  function parseCurrency(price:string):number{
    let parse:number = 0;
    if (price.length >0 ){
        parse = parseFloat(price.substring(0,price.length-2).replace(',','.'));
    }
    return parse;
}

