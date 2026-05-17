import data from "./assets/data";
import { useState } from "react";
import Results from "./components/Results";
import Form from "./components/Form";
import Papa from "papaparse"

export default function App() {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)

  async function parseFile(file) {
    return new Promise(resolve => Papa.parse(file, {
      complete: (result, file) => {
        let factors = [{}]
        let rd = result.data
        
        for (let i = 0; i < rd[0].length; i++) {
          const r = data.find(d => d.title === rd[0][i])?.name

          if (r === null) throw new Error("Неправильные названия столбцов")

          rd[0][i] = r
        }

        let n = rd[0].length

        for (let i = 1; i < rd.length; i++) {
          if (i !== 1) factors.push({})

          for (let j = 0; j < n; j++) {
            if (j === 0) factors[i - 1][rd[0][j]] = rd[i][j]
            else factors[i - 1][rd[0][j]] = parseFloat(rd[i][j])
          }
        }

        resolve(factors)
      }
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const file = formData.get("file")

    let factors = [{}]

    if (file.name === "")
      for (let [key, value] of formData) {
        if (key === "file") continue

        if (key === "region") {
          factors[0]["region"] = value
          continue
        }

        factors[0][key] = parseInt(value)
      }
    else {
      factors = await parseFile(file)
    }

    const json = JSON.stringify(factors)

    await sendReq(json)

    setShowResult(true)
  }

  async function sendReq(jsonReq) {
    try {
      const res = await fetch("http://localhost/deviant-forecast", {
        method: "POST",
        body: jsonReq,
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
  
      setResult(data)
    } catch(error) {
      console.log(error)
    }
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

        {showResult && <Results result={result} />}

        <Form
          style={{display: showResult ? "none" : "flex"}}
          data={data}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  )
}