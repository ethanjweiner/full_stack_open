const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce(
          (total, { exercises }) => total + exercises,
          0
        )}
      />
    </div>
  );
};

// Components
const Header = (props) => <h1>{props.courseName}</h1>;

const Content = (props) =>
  props.parts.map(({ name, exercises }) => (
    <Part key={name} name={name} exercises={exercises} />
  ));

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

export default App;
