export default function(d) {
  return new Intl.DateTimeFormat('th-TH', {
    weekday : 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(d)
}