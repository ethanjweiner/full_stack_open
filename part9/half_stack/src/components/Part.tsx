import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  let courseDetails;

  switch (coursePart.type) {
    case 'normal':
      courseDetails = <p><i>{coursePart.description}</i></p>
      break;
    case 'groupProject':
      courseDetails = <p>project exercises {coursePart.groupProjectCount}</p>
      break;
    case 'submission':
      courseDetails = (
        <>
          <p><i>{coursePart.description}</i></p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </>
      );
      break;
    case 'special':
      courseDetails = (
        <>
          <p><i>{coursePart.description}</i></p>
          <p>required skills: {coursePart.requirements.join(', ')}</p>
        </>
      );
      break;
    default:
      assertNever(coursePart);
  }

  return (
    <div>
      <p><strong>{coursePart.name} {coursePart.exerciseCount}</strong></p>
      {courseDetails}
    </div>
  )
}

export default Part;