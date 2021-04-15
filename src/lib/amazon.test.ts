import * as amazon from "./amazon";

describe('Amazon',() =>{
   describe("Amazonの画像URLを取得する",() =>{
       it('/dp/******のパターン', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/dp/B01BM6FQQS/ref=cm_sw_r_cp_api_i_7NXSD1FGD62V9GRRSHFQ");
           expect(imageUrl).toBe("https://images-na.ssl-images-amazon.com/images/P/B01BM6FQQS.09.MZZZZZZZ");
       });

       it('/dp/******で複雑なURLパターン', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/SwitchBot-%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81%E3%83%9C%E3%83%83%E3%83%88-%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%9B%E3%83%BC%E3%83%A0-%E5%AD%A6%E7%BF%92%E3%83%AA%E3%83%A2%E3%82%B3%E3%83%B3-Alexa/dp/B07TTH5TMW/ref=lp_6257144051_1_1?s=specialty-aps");
           expect(imageUrl).toBe("https://images-na.ssl-images-amazon.com/images/P/B07TTH5TMW.09.MZZZZZZZ");
       });

       it('/exec/obidos/ASIN/******のパターン', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/exec/obidos/ASIN/4163741100/mersys-22/ref=nosim");
           expect(imageUrl).toBe("https://images-na.ssl-images-amazon.com/images/P/4163741100.09.MZZZZZZZ");
       });

       it('/gp/product/******のパターン', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/gp/product/B004W6ISOI");
           expect(imageUrl).toBe("https://images-na.ssl-images-amazon.com/images/P/B004W6ISOI.09.MZZZZZZZ");
       });

       it('/o/ASIN/******のパターン', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/o/ASIN/B004W6ISOI");
           expect(imageUrl).toBe("https://images-na.ssl-images-amazon.com/images/P/B004W6ISOI.09.MZZZZZZZ");
       });
   });
});
