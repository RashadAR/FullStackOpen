export default function Filter({ filter, handleChange }) {
    return (
        <p>Find Countries:
            <input type="text" value={filter} onChange={handleChange} />
        </p>
    )
}