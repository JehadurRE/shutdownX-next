import type React from "react"
import type { ReactNode } from "react"
import Navigation from "./Navigation"
import ContactModal from "./ContactModal"
import InfoModal from "./InfoModal"
import Toast from "./Toast"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <ContactModal />
      <InfoModal />
      <Toast />
    </>
  )
}

export default Layout
