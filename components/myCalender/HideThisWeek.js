import React from 'react'

function HideThisWeek(  {setThisWeekBtn}  ) {
  return (
    <button onClick={() => setThisWeekBtn(null)}>HideThisWeek</button>
  )
}

export default HideThisWeek