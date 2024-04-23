import './CSS/loadingCircle.css'

type Props = {
  fillColor?: string
}

function LoadingCircle({ fillColor = '#fff' }: Props) {
  return (
    <div className='loading-circle'>
      <svg className='spinner' viewBox='0 0 50 50'>
        <circle className='path' cx='25' cy='25' r='20' fill={fillColor} strokeWidth='5'></circle>
      </svg>
    </div>
  )
}

export default LoadingCircle
