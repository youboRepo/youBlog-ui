import defaultSettings from '@/settings'

export default function getPageTitle(pageTitle) {
  const title = defaultSettings.title || 'Vue Admin Template'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
