export default function getSaturday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + 6
  return new Date(d.setDate(diff));
}
