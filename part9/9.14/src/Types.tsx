export interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CoursePartBaseWithOptionalDescription extends CoursePartBase {
  description?: string
}

interface CourseNormalPart extends CoursePartBaseWithOptionalDescription {
  type: "normal"
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBaseWithOptionalDescription {
  type: "submission"
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartBaseWithOptionalDescription {
  type: "special"
  requirements: string[]
}

export type CoursePart =
CourseNormalPart 
| CourseProjectPart 
| CourseSubmissionPart 
| CourseSpecialPart