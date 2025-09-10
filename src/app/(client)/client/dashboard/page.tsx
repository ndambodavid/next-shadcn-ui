'use client'

import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import ClientHomePage from "@/components/client/client-home"

export default function DashboardPage() {

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <ClientHomePage />
    </>
  )
}
