function validateSelectedDays(selected_days, calendar) {
  console.log("selected_days: " + selected_days);

  if (selected_days.length > 1) {
    console.log("LAST index - selected_days: " + selected_days.at(-1));
    console.log("LAST 2nd index - selected_days: " + selected_days.at(-2));

    if (selected_days.at(-2) == selected_days.at(-1)) {
      return [selected_days.at(-1)] // return array so that I can use .includes
    }

    if (    selected_days.at(-2) < selected_days.at(-1) ) {

      let return_array = []

      calendar.map((week) => {
        week["days"].map((day) => {

          if (  selected_days.at(-2) <= day.unix() && day.unix() <= selected_days.at(-1)    ) {
            // console.log('Smaller:       ' + selected_days.at(-2))
            // console.log("day.unix():    " + day.unix());
            // console.log('Larger:        ' + selected_days.at(-1))
            return_array.push(day.unix())
          }
        });
      });

      return return_array;
    }

    if (selected_days.at(-2) > selected_days.at(-1)) {
      return [] // return array so that I can use .includes
    }
  }
}

export default validateSelectedDays;
