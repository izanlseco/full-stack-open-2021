import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
 return (
   <div>
     {course.parts.map(parts => 
      <Part key={parts.id} parts={parts} />
     )}
     
   </div>
 )
}

export default Content