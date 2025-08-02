
function ButtonSecondary({type, label, className, ...rest}) {
    return (
        <button
            type={type}
            {...rest}       
            className={`${className} from-zinc-400 to-zinc-600 hover:from-zinc-500 hover:to-zinc-800 bg-gradient-to-b text-white text-center font-bold py-3 px-6 rounded-lg cursor-pointer transition-colors`}
        >
            {label}
        </button>

    )
}

export default ButtonSecondary;