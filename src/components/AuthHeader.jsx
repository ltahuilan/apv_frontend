
function AuthHeader(props) {
    const {text} = props;

    return (
        <h2 className="text-5xl text-indigo-600 text-right font-bold">
            {`${text} `}<span className="text-zinc-900 dark:text-zinc-300">administrar tus pacientes</span>
        </h2>
    )
}

export default AuthHeader;
