import React from 'react'

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>
            <div className='border-4 border-t-4 border-t-emerald-500 border-gray-200 h-12 w-12 rounded-full animate-spin'></div>
        </div>
    )
}

export default Loader
