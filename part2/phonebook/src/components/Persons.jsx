export default function Persons({ person, handleDelete }) {
    return (
        <p>
            {person.name} - {person.number}
            <button onClick={handleDelete}>Delete</button>
        </p>
    )
} 