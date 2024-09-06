const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return parts.map((part) => <Part key={part.id} part={part} />)
}

const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0);
    return <h3>Total of {sum} exercises</h3>
}
const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;