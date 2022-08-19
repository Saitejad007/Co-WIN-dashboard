// Write your code here
import './index.css'
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccinationDetails} = props
  const {firstDose, secondDose, vaccineDate} = vaccinationDetails
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={400}
        data={vaccinationDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="firstDose"
          name="Dose 1"
          radius={[10, 10, 0, 0]}
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          dataKey="secondDose"
          radius={[10, 10, 0, 0]}
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
