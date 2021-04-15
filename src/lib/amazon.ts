const regexp = /\/(dp|gp\/product|ASIN|exec\/obidos\/ASIN|o\/ASIN)\/[\d\w]+/g;
const replace = /\/(dp|gp\/product|ASIN|exec\/obidos\/ASIN|o\/ASIN)\//;

export function fetchImageUrl(url:string){
    if(!url){
        return "";
    }

    const patternMatch = url.match(regexp);
    if(patternMatch !== null){
        const asin = patternMatch[0].replace(replace,'');
        return `https://images-na.ssl-images-amazon.com/images/P/${asin}.09.MZZZZZZZ`
    }
    return "";
}
