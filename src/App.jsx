import { useEffect, useState } from "react"

export default function App() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: document.getElementById('root').innerHTML
    }} />
  )
}