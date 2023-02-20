import moment from "moment/moment";

function CurrentTime(clickedNumber = 0, layoutMode = "monthly") {
  const calendar = [];

  switch (layoutMode) {
    case "monthly":
      const currentDay = moment().add(clickedNumber, "month");

      const startDay = currentDay.clone().startOf("month").startOf("week");
      const endDay = currentDay.clone().endOf("month").endOf("week");

      let date = startDay.clone().subtract(1, "day"); //without this line I will get ONE less day --> get the Sunday

      while (date.isBefore(endDay, "day")) {
        calendar.push({
          days: Array(7)
            .fill(0)
            .map(() => date.add(1, "day").clone()),
        });
      }

      return [calendar, currentDay];

    case "weekly":
      const currentWeek = moment().add(clickedNumber, "week");

      const startWeek = currentWeek.clone().startOf("week");
      const endWeek = currentWeek.clone().endOf("week");

      let date_weekly = startWeek.clone().subtract(1, "day"); //without this line I will get ONE less day --> get the Sunday

      while (date_weekly.isBefore(endWeek, "day")) {
        calendar.push({
          days: Array(7)
            .fill(0)
            .map(() => date_weekly.add(1, "day").clone()),
        });
      }

      return [calendar, currentWeek];
  }
}

export default CurrentTime;
