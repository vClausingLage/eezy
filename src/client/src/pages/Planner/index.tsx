import { useState, useEffect } from 'react'

import ShowAircraftCards from './components/showAircraftCards'
import SelectedAircraftCard from './components/selectedAircraftCard'
import FlightCalculator from './components/fuelCalculator'
import RouteCalculator from './components/routeCalculator'
import CreateAircraftForm from './components/createAircraftForm'

import { IAircraft, ICreateAircraft } from './types/IAaircraft'
import { Alert } from '../../ui/alert'

type Props = {
  user?: string
  isAuthenticated?: boolean
}

function FlightPlanner({ user, isAuthenticated }: Props) {
  const [aircraftList, setAircraftList] = useState([] as IAircraft[])
  const [aircraft, setAircraft] = useState({} as IAircraft)
  const [loading, setLoading] = useState(false)
  const [createSuccess, setCreateSuccess] = useState(false)

  const isAircraftSelected = () => Object.keys(aircraft).length > 0

  const {
    id,
    manufacturer,
    model,
    registration_number,
    fuel_capacity,
    cruise_fuel_consumption,
    cruise_speed
  } = aircraft

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchAircraft = async () => {
        const response = await fetch(`/api/aircraft/create/${user}`)
        const result = await response.json()
        if (result.message === 'fetched') {
          setAircraftList(result.data)
          setLoading(false)
        } else if (result.message === 'no aircraft') {
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
      if (aircraftList.length === 0 && isAuthenticated) {
        setLoading(true)
        fetchAircraft()
      }
    }
  }, [isAuthenticated, user, aircraftList.length])

  async function createAircraft(newAircraft: ICreateAircraft): Promise<any> {
    console.log(newAircraft)
    if (isAuthenticated && newAircraft.user!.length > 0) {
      try {
        const response = await fetch('/api/aircraft/create', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAircraft)
        })
        const result = await response.json()
        if (result.message === 'created') {
          setAircraft(result)
          setCreateSuccess(true)
          setTimeout(() => {
            setCreateSuccess(false)
          }, 2000)
        }
      } catch (error) {
        console.log('error getAircarft', error)
      }
    }
  }

  const editAircraft = async (
    id: number | null,
    user?: string
  ): Promise<any> => {
    try {
      if (id && user) {
        const response = await fetch(`/api/aircraft/create/${id}`, {
          method: 'update',
          headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json()
        console.log('edited', result.data)
      }
    } catch (error) {
      console.log('error editAircraft', error)
    }
  }

  const deleteAircraft = async (
    id: number | null,
    user?: string
  ): Promise<any> => {
    try {
      if (id && user) {
        const response = await fetch(`/api/aircraft/create/${id}${user}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        if (result.message === 'deleted') {
          setAircraftList(result.data)
        }
      }
    } catch (error) {
      console.log('error deleteAircraft', error)
    }
  }

  const selectAircraft = (aircraft: IAircraft): void => {
    if (aircraft) setAircraft(aircraft)
  }

  const deselectAircraft = (): void => {
    setAircraft({} as IAircraft)
  }

  const getDistance = (distance: number) => {
    console.log(distance)
  }

  return (
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <div>
          <h2>Flight Planner</h2>
          {!isAircraftSelected() && (
            <div>
              <Alert severity='info' heading='select your aircraft' text='' />
              <ShowAircraftCards
                aircraftList={aircraftList}
                loading={loading}
                selectAircraft={(id) => selectAircraft(id)}
                user={user}
              />
            </div>
          )}
          {isAircraftSelected() && (
            <div>
              <SelectedAircraftCard
                aircraft={{
                  id,
                  manufacturer,
                  model,
                  registration_number
                }}
                editAircraft={editAircraft}
                deleteAircraft={deleteAircraft}
                deselectAircraft={deselectAircraft}
                user={user}
              />

              <div
                className='grid-cols-2 items-center gap-2'
              >
                <div>
                  <RouteCalculator getDistance={() => getDistance} />
                </div>
                <div>
                  <FlightCalculator
                    fuelCapacity={fuel_capacity}
                    fuelConsumption={cruise_fuel_consumption}
                    cruiseSpeed={cruise_speed}
                  //! distance={distance}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <CreateAircraftForm
            user={user}
            isAuthenticated={isAuthenticated}
            createAircraft={createAircraft}
            createSuccess={createSuccess}
            aircraft={aircraft}
          />
        </div>
      </div>
    </>
  )
}

export default FlightPlanner
