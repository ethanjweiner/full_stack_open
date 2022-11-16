interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescriptionBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescriptionBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescriptionBase {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;