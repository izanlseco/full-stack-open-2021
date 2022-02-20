import { CoursePart } from '../Types'
import Part from './Part'
import React from 'react'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.type} part={part} />
      ))}
    </>
  )
}

export default Content