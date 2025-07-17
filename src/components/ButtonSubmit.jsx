import React from 'react'

function ButtonSubmit({type, value, onSubmit}) {
    return (
        <input
            type={type}
            value={value}
            onSubmit={onSubmit}
            className="w-full to-indigo-600 from-indigo-800 hover:to-indigo-700 hover:from-indigo-900 bg-gradient-to-t text-white text-center font-bold py-3 px-6 rounded-lg cursor-pointer"
        />
    )
}

export default ButtonSubmit