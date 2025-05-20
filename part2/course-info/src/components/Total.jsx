const Total = ({ parts }) => {
  return (
    <p>
      Total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises
    </p>
  );
};

export default Total;
