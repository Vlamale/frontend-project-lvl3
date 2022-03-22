export function getRssProxyLink(url) {
  return `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
}

export function parseXml(data) {
  const parser = new DOMParser();
  const $parsedXml = parser.parseFromString(data, 'application/xml');
  const errorNode = $parsedXml.querySelector('parsererror');
  if (errorNode) {
    throw new Error('form.errors.parsingError');
  }

  return $parsedXml;
}
