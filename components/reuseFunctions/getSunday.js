export default function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day 
    return new Date(d.setDate(diff));
  }
