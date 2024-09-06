export default function PersonForm({ onSubmit, nameValue, numValue, onNameChange, onNumChange }) {
    return (
        <form onSubmit={onSubmit}>
            <h2>Add a new</h2>
            <div>
                name: <input value={nameValue} onChange={onNameChange} />
            </div>
            <br />
            <div>number: <input value={numValue} onChange={onNumChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}