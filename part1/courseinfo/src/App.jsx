const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ partName, numOfExercises }) => {
  return (
    <p>
      {partName} {numOfExercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      <Part
        partName={course.parts[0].name}
        numOfExercises={course.parts[0].exercises}
      />
      <Part
        partName={course.parts[1].name}
        numOfExercises={course.parts[1].exercises}
      />
      <Part
        partName={course.parts[2].name}
        numOfExercises={course.parts[2].exercises}
      />
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      Number of exercises {}
      {course.parts[0].exercises +
        course.parts[1].exercises +
        course.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />

      <Total course={course} />
    </div>
  );
};

export default App;
