import { describe, it, expect } from 'vitest';
import { parseLotteDfsHtml } from '../lottedfs';

const SAMPLE_LOTTE_HTML = `
<div id="searchShopPrdList">
  <div class="goods_list">
    <ol id="unitStyleList">
      <li>
        <a href="javascript:void(0);" class="unit_link" data-prdNo="20000959645" data-prdOptNo="20001278569">
          <span class="unit_no">1</span>
          <div class="unit_img">
            <img src="https://static.lottedfs.com/prod/prd-img/sample1.jpg/dims/resize/400x400" alt="립 슬리핑 마스크">
          </div>
          <div class="unit_info">
            <span class="brand"><i class="kor">프레티</i></span>
            <span class="name">[2개 이상 47%] 프레티 입술 허니앤베리 립 슬리핑 마스크 15g</span>
            <div class="price">
              <span class="us_price">$14</span>
              <span class="dc_price">$9.8</span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" class="unit_link" data-prdNo="20000946008" data-prdOptNo="20001256135">
          <span class="unit_no">2</span>
          <div class="unit_img">
            <img data-src="https://static.lottedfs.com/prod/prd-img/sample2.jpg/dims/resize/400x400" src="/noimg.jpg" alt="아토베리어365">
          </div>
          <div class="unit_info">
            <span class="brand"><i class="kor">에스트라</i></span>
            <span class="name">아토베리어365 크림 듀오 기획세트</span>
            <div class="price">
              <span class="us_price">$42</span>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" class="unit_link" data-prdNo="20000999999" data-prdOptNo="20001999999">
          <span class="unit_no">3</span>
          <div class="unit_img">
            <img src="https://static.lottedfs.com/prod/prd-img/sample3.jpg" alt="테스트3">
          </div>
          <div class="unit_info">
            <span class="brand"><i class="kor">설화수</i></span>
            <span class="name">윤조에센스</span>
          </div>
          <div class="unit_price">
            <span class="price01">&#x0024;95</span>
            <strong class="price02">&#x0024;76.5 <i class="sale">19&#x0025;</i></strong>
          </div>
        </a>
      </li>
    </ol>
  </div>
</div>
`;

describe('parseLotteDfsHtml', () => {
  it('should extract ranking items with normalized fields from Lotte DFS HTML', () => {
    const items = parseLotteDfsHtml(SAMPLE_LOTTE_HTML, 20);

    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({
      rank: 1,
      source_product_id: '20000959645',
      product_url:
        'https://kor.lottedfs.com/kr/product/productDetail?prdNo=20000959645&prdOptNo=20001278569',
      image_url:
        'https://static.lottedfs.com/prod/prd-img/sample1.jpg/dims/resize/400x400',
      currency: 'USD',
      price: 14,
      sale_price: 9.8,
      brand: {
        ko: '프레티',
        en: '',
        ja: '',
        'zh-CN': '',
        'zh-TW': '',
      },
      name: {
        ko: '[2개 이상 47%] 프레티 입술 허니앤베리 립 슬리핑 마스크 15g',
        en: '',
        ja: '',
        'zh-CN': '',
        'zh-TW': '',
      },
    });
  });

  it('should prefer real CDN data-src over placeholder src when lazy-loaded', () => {
    const items = parseLotteDfsHtml(SAMPLE_LOTTE_HTML, 20);

    expect(items[1].image_url).toBe(
      'https://static.lottedfs.com/prod/prd-img/sample2.jpg/dims/resize/400x400'
    );
    expect(items[1].price).toBe(42);
    expect(items[1].sale_price).toBeNull();
  });

  it('should extract price01 and price02 from .unit_price sibling block', () => {
    const items = parseLotteDfsHtml(SAMPLE_LOTTE_HTML, 20);

    expect(items[2].price).toBe(95);
    expect(items[2].sale_price).toBe(76.5);
  });
});
