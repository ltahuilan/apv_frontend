
function ButtonDanger({type, label, ...rest}) {
    return (
        <button
            type={type}
            {...rest}       
            className={`w-full from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 bg-gradient-to-b text-white text-center font-bold py-3 px-6 rounded-lg cursor-pointer`}
        >
            {label}
        </button>

    )
}

export default ButtonDanger;