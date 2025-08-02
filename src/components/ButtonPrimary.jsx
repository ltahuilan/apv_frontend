
function ButtonPrimary({type, label, className='', ...rest}) {
    return (
        <button
            type={type}
            {...rest}       
            className={`${className} w-full from-indigo-400 to-indigo-700 hover:from-indigo-700 hover:to-indigo-900 bg-gradient-to-b text-white text-center font-bold py-3 px-6 rounded-lg cursor-pointer transition-colors`}
        >
            {label}
        </button>

    )
}

export default ButtonPrimary;