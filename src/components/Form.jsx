import Field from "./Field"

export default function Form({style, data, handleSubmit}) {
    return (
        <section style={style} className="data-input">
            <h1>Введите данные вашего региона</h1>

            <form className="form" onSubmit={handleSubmit}>
                {data.map((elem) => {
                    return (
                        <Field
                            key={elem.name}
                            {...elem}
                        />
                    )
                })}

                <div className="buttons-group">
                    <input name="file" type="file" accept=".csv" />
                    <button type="sumbit">Показать результат</button>
                </div>
            </form>
        </section>
    )
}