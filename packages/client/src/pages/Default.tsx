import React, { useEffect } from 'react'

import { checkSession } from 'features/authentication'

function DefaultPage() {
  useEffect(() => {
    ;(async function () {
      if (await checkSession()) window.location.pathname = '/player'
      else window.location.pathname = '/login'
    })()
  }, [])

  return <div></div>
}

export default DefaultPage
