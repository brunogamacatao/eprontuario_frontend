import React from 'react'

export default function BotaoFlutuante({label, ...props}) {
  return (
    <button className="w-100 btn btn-lg btn-primary" type="submit" {...props}>
      {label}
    </button>
  )
}