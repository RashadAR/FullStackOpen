export default function Filter({ filter, handleChange }) {
    return (
        <p>Filter Shown with a <input value={filter} onChange={handleChange} /></p>
    )
}