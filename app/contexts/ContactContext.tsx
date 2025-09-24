"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface ContactContextType {
  isContactOpen: boolean
  isInfoOpen: boolean
  contactMode: "hire" | "refer" | "apply"
  contactRole: string
  infoService: string
  openContact: (mode: "hire" | "refer" | "apply", role?: string) => void
  closeContact: () => void
  openInfo: (service: string) => void
  closeInfo: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export const useContact = () => {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider")
  }
  return context
}

interface ContactProviderProps {
  children: ReactNode
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [contactMode, setContactMode] = useState<"hire" | "refer" | "apply">("hire")
  const [contactRole, setContactRole] = useState("")
  const [infoService, setInfoService] = useState("")

  const openContact = (mode: "hire" | "refer" | "apply", role = "") => {
    setContactMode(mode)
    setContactRole(role)
    setIsContactOpen(true)
  }

  const closeContact = () => {
    setIsContactOpen(false)
  }

  const openInfo = (service: string) => {
    setInfoService(service)
    setIsInfoOpen(true)
  }

  const closeInfo = () => {
    setIsInfoOpen(false)
  }

  return (
    <ContactContext.Provider
      value={{
        isContactOpen,
        isInfoOpen,
        contactMode,
        contactRole,
        infoService,
        openContact,
        closeContact,
        openInfo,
        closeInfo,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}
