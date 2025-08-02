import React from 'react'

function Alert({alert}) {
  const styleError = 'from-red-100 to-red-300 text-red-800';
  const styleNoError = 'from-indigo-100 dark:from-indigo-500 to-indigo-400 dark:to-indigo-900 text-indigo-800 dark:text-white';

  return (
    <div className={`${alert.error ? styleError : styleNoError} text-center text-sm font-bold p-2 my-3 rounded-lg bg-gradient-to-b`}>
        {alert.message}
    </div>
  )
}

export default Alert;

