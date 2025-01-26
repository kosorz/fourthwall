import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode | ReactNode[]; params: any }) {
  return <section className="mt-5">{children}</section>
}
