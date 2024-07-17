import { useState } from 'react'

const Statistics = (props) => {
  if (props.totalClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const positive = (props.goodClicks / props.totalClicks)*100
  const average = (props.goodClicks - props.badClicks)/props.totalClicks
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.goodClicks} />
          <StatisticLine text="neutral" value={props.neutralClicks} />
          <StatisticLine text="bad" value={props.badClicks} />
          <StatisticLine text="all" value={props.totalClicks} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>

    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleBadClick = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const handleNeutralClick = () => {
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick = {handleNeutralClick} text = 'neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <h1>statistics</h1>
        <Statistics goodClicks={good} badClicks={bad}  neutralClicks = {neutral} totalClicks = {total}/>
      </div>
    </div>
  )
}

export default App 