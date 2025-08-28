import React from 'react'

function Alert({alert}) {
  const styleError = 'from-red-100 to-red-300 text-red-800';
  const styleSuccess = 'from-green-100 dark:from-green-300 to-green-400 dark:to-green-400 text-green-800';

  return (
    <div className={`${alert.error ? styleError : styleSuccess} text-center text-sm font-bold p-2 my-6 rounded-lg bg-gradient-to-b`}>
        {alert.message}
    </div>
  )
}

export default Alert;

