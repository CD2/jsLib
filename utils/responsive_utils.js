import RESPONSIVE_PERCENTAGES from "javascript_lib/constants/responsive_percentages"

export function getCentralPanelClassName(responsivePercentage, className) {
  if (responsivePercentage < RESPONSIVE_PERCENTAGES.MEDIUM) {
    return `${className} ${className}--small`
  }
  return className
}
