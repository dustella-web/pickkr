import { describe, it, expect } from 'vitest';
import { extractDaisoProductsFromApi } from '../daisomall';

const SAMPLE_DAISO_API = {
  data: [
    {
      exhCmptmtId: '2026030521',
      mtrls: [
        {
          pdNo: '1067917',
          pdNm: '물방울형클렌징스펀지',
          exhPdNm: '[각질케어]물방울 모양 클렌징 스펀지',
          pdPrc: '1000',
          sleUtpc: '1000',
          brndNm: null,
          engBrndNm: null,
          pdImgUrl: '/file/PD/20260413/sample1.jpg',
          exhLCtgrNm: '뷰티/위생',
        },
        {
          pdNo: '1067918',
          pdNm: '리들샷 100 페이셜 부스팅 퍼스트 앰플',
          exhPdNm: '',
          pdPrc: '3000',
          sleUtpc: '3000',
          brndNm: 'VT',
          engBrndNm: 'VT',
          pdImgUrl: '/file/PD/20260413/sample2.jpg',
          exhLCtgrNm: '뷰티/위생',
        },
      ],
    },
  ],
};

describe('extractDaisoProductsFromApi', () => {
  it('should recursively extract unique Daiso beauty products into RankingItem array', () => {
    const items = extractDaisoProductsFromApi(SAMPLE_DAISO_API.data, 20);

    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      rank: 1,
      source_product_id: '1067917',
      product_url: 'https://www.daisomall.co.kr/pd/pdr/SCR_PDR_0001?pdNo=1067917',
      image_url: 'https://cdn.daisomall.co.kr/file/PD/20260413/sample1.jpg',
      currency: 'KRW',
      price: 1000,
      brand: { ko: '다이소' },
      name: { ko: '[각질케어]물방울 모양 클렌징 스펀지' },
    });
    expect(items[1].brand.ko).toBe('VT');
    expect(items[1].brand.en).toBe('VT');
    expect(items[1].price).toBe(3000);
  });
});
