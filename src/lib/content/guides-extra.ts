import type { GuideArticle } from './guides';
import { GUIDE_ARTICLES_PART1 } from './guides-part1';
import { GUIDE_ARTICLES_PART2 } from './guides-part2';
import { GUIDE_ARTICLES_PART3 } from './guides-part3';

export const EXTRA_GUIDE_ARTICLES: GuideArticle[] = [
  ...GUIDE_ARTICLES_PART1,
  ...GUIDE_ARTICLES_PART2,
  ...GUIDE_ARTICLES_PART3,
];
