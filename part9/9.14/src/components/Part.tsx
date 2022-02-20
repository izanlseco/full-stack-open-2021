import { CoursePart } from '../Types'
import React from 'react'
import { assertNever } from '../utilts'

const Part = ({part}: {part: CoursePart}) => {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <p><b>{part.name} - {part.exerciseCount}</b><br />
            {part.description}</p>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <p><b>{part.name} - {part.exerciseCount}</b><br />
            Project exercises {part.groupProjectCount}</p>
          </div>
        )
      case "submission":
        return (
          <div>
            <p><b>{part.name} - {part.exerciseCount}</b><br />
            <i>{part.description}</i><br />
            submit to {part.exerciseSubmissionLink}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <p>
              <b>{part.name} - {part.exerciseCount}</b><br />
              <i>{part.description}</i><br />
              required skills: {part.requirements.map((p) => p + ", ")}
            </p>
          </div>
        )
      default:
        return assertNever(part)
    }
}

export default Part