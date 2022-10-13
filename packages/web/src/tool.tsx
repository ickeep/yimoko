export const getAutoHref = (href: string, host = '') => {
  const isExternal = /^[\w]+:\/\//.test(href);
  return isExternal ? href : host + href;
};
