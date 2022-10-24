const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const parts = [
    {
      name: part1,
      exercises: exercises1,
    },
    {
      name: part2,
      exercises: exercises2,
    },
    {
      name: part3,
      exercises: exercises3,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) =>
  props.parts.map(({ name, exercises }) => (
    <Part key={name} name={name} exercises={exercises} />
  ));

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Total = (props) => <p>Number of exercises {props.total}</p>;

export default App;
