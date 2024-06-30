export default function(d) {
  return new Intl.DateTimeFormat("th-TH", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
};


// https://dev.to/diorla/a-guide-to-date-and-time-formatting-in-javascript-2ol2

