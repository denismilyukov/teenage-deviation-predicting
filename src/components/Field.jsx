export default function Field({ title, name, handleChange}) {
    return (
        <label>{title}:
            <input
                type="number"
                name={name}
                id={name}
                onChange={handleChange}
            />
        </label>
    )
}