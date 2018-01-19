export default function displayNameFromUrl(url) {
  return url && typeof url === `string`
    ? url
        .replace(/[-_]/g, ` `)
        .replace(/(\.png|\.jpg|\.gif|\.pdf)$|^.*\/(?=.*(\.png|\.jpg|\.gif|\.pdf)$)/g, ``)
    : null
}
