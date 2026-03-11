import Field from "./components/Field";
import data from "./assets/data";
import { useState } from "react";
import Chart from "./components/Chart";

export default function App() {
  const [showResult, setShowResult] = useState(false)
  const [factors, setFactors] = useState({})
  const [result, setResult] = useState(null)

  function handleClick(event) {
    // fetch("вставить/адрес/сервера")
    //   .then(res => res.json())
    //   .then(data => setResult(data.result))

    setResult(19)
    setShowResult(true)
  }

  function handleChange(event) {
    const {value, name} = event.currentTarget;
    setFactors(prevFactors => ({...prevFactors, [name]: value}))
  }
  
  return (
    <main>
      <div className="container">
        <div className="tabs">
          <div onClick={() => {
            if (showResult)
              setShowResult(false)
          }} className={"tab" + (showResult ? "" : " active")}>Входные данные</div>
          <div className={"tab" + (showResult ? " active" : "")}>Результаты</div>
        </div>

        {(!showResult) ? (
          <section className="data-input">
            <h1>Пожалуйста, введите данные вашего региона</h1>

            <div className="form">
              <label className="region">Название региона:
                <input
                  type="text"
                  name="region"
                  id="region"
                  onChange={handleChange}
                />
              </label>

              {data.map((elem) => {
                return <Field
                  key={elem.name}
                  {...elem}
                  handleChange={handleChange}
                />
              })}
            </div>

            <button
              type="sumbit"
              onClick={handleClick}
            >Показать результат</button>
          </section>
        ) : (
          <section>
            <h1>Результаты анализа</h1>
            
            <p>Доля девиантного населения среди подростков в вашем регионе составляет</p>

            <h2>{result}%</h2>

            <Chart className="chart" data={result} />
          </section>
        )}
      </div>
    </main>
  )
}