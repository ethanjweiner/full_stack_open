const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total
      total={course.parts.reduce(
        (total, { exercises }) => total + exercises,
        0
      )}
    />
  </div>
);

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) =>
  parts.map(({ id, name, exercises }) => (
    <Part key={id} name={name} exercises={exercises} />
  ));

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ total }) => (
  <p>
    <b>total of {total} exercises</b>
  </p>
);

export default Course;
