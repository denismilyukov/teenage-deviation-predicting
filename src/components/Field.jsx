export default function Field({ title, name }) {
    return (
        <label>{title}:
            <input
                type="number"
                name={name}
                id={name}
            />
        </label>
    )
}