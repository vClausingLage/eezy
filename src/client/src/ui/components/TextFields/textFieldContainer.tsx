import IcaoInput from './icaoInput'

import '../CSS/text-field-container.css'

type Props = {
  icon: any
  adornment: string
  value: string
  submit: (input: string) => void
}

export const TextFieldContainer = ({ icon, value, adornment, submit }: Props) => {
  return (
    <div className='text-field-container'>
      <div>
        {icon}
        <IcaoInput
          id='icao_input'
          submit={(input) => submit(input)}
          value={value}
          adornment={adornment}
        />
      </div>
    </div>
  )
}