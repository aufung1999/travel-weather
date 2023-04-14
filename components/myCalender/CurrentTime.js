import moment from "moment/moment";


function CurrentTime(clickedNumber = 0, layoutMode) {


  console.log('layoutMode: ' + layoutMode)
  let calendar = [];

  let flat_calendar = []; // for the ShowEventThresholds Reducer and redux

  switch (layoutMode) {
    case "monthly":
      calendar = [];
      flat_calendar = [];

      const currentDay = moment().add(clickedNumber, "month");

      const startDay = currentDay.clone().startOf("month").startOf("week");
      const endDay = currentDay.clone().endOf("month").endOf("week");

      let date = startDay.clone().subtract(1, "day"); //without this line I will get ONE less day --> get the Sunday

      const date_copy = date.clone();

      while (date.isBefore(endDay, "day")) {
        calendar.push({
          days: Array(7)
            .fill(0)
            .map(() => date.add(1, "day").clone()),
        });
      }

      while (date_copy.isBefore(endDay, "day")) {
        flat_calendar.push(
          date_copy.add(1, "day").clone().format("YYYY-MM-DD")
        );
      }

      return [calendar, currentDay, flat_calendar];

    case "weekly":
      calendar = [];
      flat_calendar = [];

      const currentWeek = moment().add(clickedNumber, "week");

      const startWeek = currentWeek.clone().startOf("week");
      const endWeek = currentWeek.clone().endOf("week");

      const date_weekly = startWeek.clone().subtract(1, "day"); //without this line I will get ONE less day --> get the Sunday

      const date_weekly_copy = date_weekly.clone();

      while (date_weekly.isBefore(endWeek, "day")) {
        calendar.push({
          days: Array(7)
            .fill(0)
            .map(() => date_weekly.add(1, "day").clone()),
        });
      }

      while (date_weekly_copy.isBefore(endWeek, "day")) {
        flat_calendar.push(
          date_weekly_copy.add(1, "day").clone().format("YYYY-MM-DD")
        );
      }

      console.log('flat_calendar: ' + flat_calendar)

      return [calendar, currentWeek, flat_calendar];
  }
}

export default CurrentTime;
