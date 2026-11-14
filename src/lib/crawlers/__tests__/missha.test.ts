import { describe, it, expect } from 'vitest';
import { parseMisshaProductList } from '../missha';

const SAMPLE_MISSHA_JSON = {
  list: [
    {
      prdmCd: 'BO00112433',
      prdmNm: '개똥쑥 진정 스팟 팩',
      prdmRepImgFileNm: '20211101134237.jpg',
      prdmLinkUrl: 'https://www.mynunc.com/product/goods/view-goods?goodsId=BO00112433',
      prdmPrc: '18000',
    },
    {
      prdmCd: 'BO00110001',
      prdmNm: '타임레볼루션 더퍼스트에센스 5X',
      prdmRepImgFileNm: '20210101.jpg',
      prdmLinkUrl: '',
      prdmPrc: '42,000',
    },
  ],
};

describe('parseMisshaProductList', () => {
  it('should normalize Missha API product list into RankingItem array', () => {
    const items = parseMisshaProductList(SAMPLE_MISSHA_JSON, 20);

    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      rank: 1,
      source_product_id: 'BO00112433',
      product_url: 'https://www.mynunc.com/product/goods/view-goods?goodsId=BO00112433',
      image_url: 'https://missha.com/upload/product/productmanage/20211101134237.jpg',
      currency: 'KRW',
      price: 18000,
      brand: {
        ko: '미샤',
        en: 'MISSHA',
      },
      name: {
        ko: '개똥쑥 진정 스팟 팩',
      },
    });
    expect(items[1].price).toBe(42000);
    expect(items[1].product_url).toBe(
      'https://missha.com/kr/skincare/product_detail?prdmCd=BO00110001'
    );
  });
});
