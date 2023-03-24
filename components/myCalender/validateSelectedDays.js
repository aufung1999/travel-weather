function validateSelectedDays(selected_days, calendar) {
  console.log(calendar);
  console.log("selected_days: " + selected_days);

  if (selected_days.length == 1) {  ////// CASE
    if (selected_days.at(-1)) {
      let return_array = [];
      return_array.push(selected_days.at(-1) * 1000); //TIME
      return return_array; // return array so that I can use .includes
    }
  }

  if (selected_days.length > 1) { ////// CASE
    console.log("LAST index - selected_days: " + selected_days.at(-1));
    console.log("LAST 2nd index - selected_days: " + selected_days.at(-2));

    if (selected_days.at(-2) == selected_days.at(-1)) {
      let return_array = [];
      return_array.push(selected_days.at(-1) * 1000); //TIME
      return return_array; // return array so that I can use .includes
    }

    if (selected_days.at(-2) < selected_days.at(-1)) {
      console.log("hi: ");
      let return_array = [];

      calendar.map((week) => {
        console.log("week: " + week);
        week["days"].map((day) => {
          // console.log("day.unix(): " + day);
          if (
            selected_days.at(-2) <= day.unix() &&
            day.unix() <= selected_days.at(-1)
          ) {
            return_array.push(day.unix() * 1000); //TIME
          }
        });
      });

      console.log(return_array);

      return return_array;
    }

    if (selected_days.at(-2) > selected_days.at(-1)) {
      return []; // return array so that I can use .includes
    }
  }
}

export default validateSelectedDays;
