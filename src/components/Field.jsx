export default function Field({ title, name, type }) {
    return (
        <label>{title}:
            <input
                type={type ?? "number"}
                name={name}
                id={name}
            />
        </label>
    )
}