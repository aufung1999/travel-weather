function validateSelectedDays(selected_days, calendar) {
  console.log("selected_days: " + selected_days);

  if (selected_days.length > 1) {
    console.log("LAST index - selected_days: " + selected_days.at(-1));
    console.log("LAST 2nd index - selected_days: " + selected_days.at(-2));

    if (selected_days.at(-1)) {
      let return_array = [];
      return_array.push(selected_days.at(-1) * 1000); //TIME
      return return_array; // return array so that I can use .includes
    }

    if (selected_days.at(-2) == selected_days.at(-1)) {
      let return_array = [];
      return_array.push(selected_days.at(-1) * 1000); //TIME
      return return_array; // return array so that I can use .includes
    }

    if (selected_days.at(-2) < selected_days.at(-1)) {
      let return_array = [];

      calendar.map((week) => {
        week["days"].map((day) => {
          if (
            selected_days.at(-2) <= day.unix() &&
            day.unix() <= selected_days.at(-1)
          ) {
            return_array.push(day.unix() * 1000); //TIME
          }
        });
      });

      return return_array;
    }

    if (selected_days.at(-2) > selected_days.at(-1)) {
      return []; // return array so that I can use .includes
    }
  }
}

export default validateSelectedDays;
