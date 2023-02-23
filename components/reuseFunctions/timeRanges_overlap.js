import React from 'react'

function timeRanges_overlap(StartDate1, EndDate1, StartDate2, EndDate2) {

  const overlap = Math.max(0, Math.min(EndDate1, EndDate2) - Math.max(StartDate1, StartDate2))

  console.log('overlap: ' + overlap)

  return overlap
}

export default timeRanges_overlap