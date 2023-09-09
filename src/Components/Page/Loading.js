import React from 'react';
import { Ping } from '@uiball/loaders'

export default function Loading({ isLoading, specialist }) {
  return (
    <div aria-live="polite" aria-busy={isLoading}>
      {isLoading ? <> <Ping size={45} speed={2} color="blue" /> <h3>Connecting you with our {specialist}</h3> </> : <> <br /><br /> </> }    
    </div>
  )
}
