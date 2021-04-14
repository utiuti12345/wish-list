const regexp = /[^0-9A-Z]([0-9A-Z]{10})([^0-9A-Z]|$)/;

export function fetchImageUrl(url:string){
    if(!url){
        return "";
    }

    const asinCode = url.match(regexp);
    return `https://images-na.ssl-images-amazon.com/images/P/${asinCode}.09.MZZZZZZZ`
}
