import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"

export default function DashboardPage() {

    return (

        <div>
            <SectionCards />
            <div className="px-4 py-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
        </div>
    )
}
