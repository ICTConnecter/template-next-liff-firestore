import { use } from "react"
import { LiffContext } from "./context/liff"

export const DisplayUserInfo = () => {
  const liffInfo = use(LiffContext)
  return <>
    {JSON.stringify(liffInfo)}
  </>
}
