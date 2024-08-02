import DataView from './DataView'

import { Box } from '@mui/material'

type Props = {
  altim: number | null
  slp: number
  temp: number
  dewp: number
  tempUnitToggle: Function
  tempUnit: string
  wxString: string
  visibilityMeters: number
}

export const DataPanel = ({
  altim,
  slp,
  temp,
  dewp,
  tempUnitToggle,
  tempUnit,
  wxString,
  visibilityMeters
}: Props) => {
  return (
    <Box className='weather-data'>
      {slp !== null && altim === null && (
        <DataView
          data={[
            {
              description: 'SLP',
              value: Math.round(slp)
            }
          ]}
          unit='hPa'
        />
      )}
      {altim !== null && slp === null && (
        <DataView
          data={[
            {
              description: 'QNH',
              value: Math.round(altim)
            }
          ]}
          unit='hPa'
        />
      )}
      {slp !== null && altim !== null && (
        <DataView
          data={[
            {
              description: 'QNH',
              value: Math.round(altim)
            },
            {
              description: 'SLP',
              value: Math.round(slp)
            }
          ]}
          unit='hPa'
        />
      )}
      <DataView
        data={[
          {
            description: 'Visibility',
            value: visibilityMeters
          }
        ]}
        unit='m'
      />
      {wxString && (
        <DataView
          data={[
            {
              description: 'Precipitation',
              value: 'here should be the wx string'
            }
          ]}
        />
      )}
      {tempUnit === '°C'
        ? (
          <>
            <DataView
              data={[
                {
                  description: 'Temperature',
                  value: temp
                },
                {
                  description: 'Dewpoint',
                  value: dewp
                }
              ]}
              unit={tempUnit}
              tempUnitToggle={() => tempUnitToggle(tempUnit)}
            />
          </>
        )
        : (
          <>
            <DataView
              data={[
                {
                  description: 'Temperature',
                  value: Math.round(temp * (9 / 5) + 32)
                },
                {
                  description: 'Dewpoint',
                  value: Math.round(dewp * (9 / 5) + 32)
                }
              ]}
              unit={tempUnit}
              tempUnitToggle={() => tempUnitToggle(tempUnit)}
            />
          </>
        )}
    </Box>
  )
}
