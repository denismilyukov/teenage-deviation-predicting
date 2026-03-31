import ColumnChart from "./ColumnChart"
import PieChart from "./PieChart"

export default function Results({style, result}) {
    return (
        <section style={style}>
            <h1>Результаты анализа</h1>

            <p>Доля девиантного населения среди подростков в выбранных регионах</p>

            {result.length === 1 ? <>    
                <h2>{result[0].result}%</h2>
    
                <PieChart className="chart" data={result[0]} />
            </> : <>
                <ColumnChart className="chart" data={result} />
            </>}
        </section>
    )
}