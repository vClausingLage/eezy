import '../CSS/planner-calculator.css'

type Props = {
  id: string
  label: string
  unit: string
  value: number | undefined
  placeholder: string
  helperText: string
  handleChange: (e: any) => void
}

function FuelCalculatorTextInput({
  id,
  label,
  unit,
  value,
  placeholder,
  helperText,
  handleChange
}: Props) {
  function onSubmit(e: any) {
    e.preventDefault()
  }
  return (
    <span className='fuel-calculator-stack'
    >
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor={id} >{label}</label>
        <input
          id={id}
          type='number'
          required
          value={value}
          placeholder={placeholder}
          name={unit}
          onChange={(e) => handleChange(e)}
          onSubmit={(e) => onSubmit(e)}
          className='fuel-selection'
        />
      </form>
      <p>{helperText}</p>
    </span>
  )
}

export default FuelCalculatorTextInput
