const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    );
  };
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    );
  };
  
  const Content = (props) => {
    const { parts } = props
    return (
      <div>
        {parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p>
          <strong>total of {total} exercises</strong>
        </p>
      </div>
    );
  };
  
  const Course = (props) => {
    const courses = props.courses;
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    );
  };
  
  export default Course
  