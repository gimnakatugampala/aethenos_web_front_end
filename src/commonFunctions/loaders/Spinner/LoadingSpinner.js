import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const LoadingSpinner = ({ w,h,wpclass }) => {
  return (
    <div className='d-flex justify-content-center align-items-center h-100 w-100 mt-4'>
    <TailSpin
    visible={true}
    height={h}
    width={w}
    color="#e01d20"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass={wpclass}
    />
    </div>
  )
}

export default LoadingSpinner