module.exports = {
  tHome: 'Home',
  tRelatedPosts: 'Related Posts',
  tTags: 'Tags',
  tTransationAvailable: 'Translations available: ',
  taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
  tfTagHeader: (totalCount, tag) =>
  `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`,
  t404Title: 'Not Found',
  t404Content: 'You just hit a route that doesn&#39;t exist... the sadness.',
};
