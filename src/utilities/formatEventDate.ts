/**
 * Formats a date string to "Day number, Month (three letters) and full year"
 * Example: "15 Jan 2024"
 */
export const formatEventDate = (dateString: string | null | undefined): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  
  const day = date.getDate()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  
  return `${day} ${month} ${year}`
}

