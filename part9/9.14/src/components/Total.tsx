import { CoursePart } from '../Types'
import React from 'react'

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        Number of exercises -
        <strong>
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </strong>
      </p>
    </div>
  )
}

export default Total