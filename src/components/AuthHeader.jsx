
function AuthHeader(props) {
    const {text} = props;

    return (
        <h2 className="text-5xl text-indigo-600 text-right font-bold">
            {`${text} `}<span className="text-slate-900 dark:text-slate-300">administrar tus pacientes</span>
        </h2>
    )
}

export default AuthHeader;
