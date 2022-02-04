import React from 'react'

const Total = ({ course }) => {
  return <p><b>The total of exercises is {course.parts.reduce((sum, parts) => sum + parts.exercises, 0)}</b></p>
}

export default Total