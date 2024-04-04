import { styled } from '@mui/material/styles'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function Hero () {
  return (
    <>
      <Img src='/planner-image.svg' alt='clipboard with aircraft' />
    </>
  )
}

export default Hero
