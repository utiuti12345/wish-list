import * as amazon from "./amazon";

describe('Amazon',() =>{
   describe("Amazon Image Url Get",() =>{
       it('Amazon Image Url Get', () => {
           const imageUrl = amazon.fetchImageUrl("https://www.amazon.co.jp/dp/B01BM6FQQS/ref=cm_sw_r_cp_api_i_7NXSD1FGD62V9GRRSHFQ");
           expect(imageUrl).toBe("https://www.amazon.co.jp/dp/B01BM6FQQS/ref=cm_sw_r_cp_api_i_7NXSD1FGD62V9GRRSHFQ");
       });
   });
});
