"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Building2,
  Smartphone,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Wallet,
} from "lucide-react"

// Mock data for talent earnings
const mockTalentStats = {
  totalEarnings: 28450.0,
  thisMonth: 4200.0,
  pendingPayouts: 3,
  completedPayouts: 18,
  averageHourlyRate: 65.0,
}

const mockPayoutMethods = [
  {
    id: "pm-001",
    type: "bank",
    name: "Savings Account",
    details: "****9876",
    isDefault: true,
  },
  {
    id: "pm-002",
    type: "mobile_money",
    name: "Airtel Money",
    details: "+256 *** ***456",
    isDefault: false,
  },
]

const mockEarnings = [
  {
    id: "EARN-001",
    project: "E-commerce Platform Development",
    client: "TechCorp Inc.",
    amount: 3200.0,
    hours: 48,
    rate: 66.67,
    method: "bank",
    status: "completed",
    date: "2024-01-15",
    payoutDate: "2024-01-17",
  },
  {
    id: "EARN-002",
    project: "Mobile App UI/UX Design",
    client: "StartupXYZ",
    amount: 1800.0,
    hours: 30,
    rate: 60.0,
    method: "mobile_money",
    status: "pending",
    date: "2024-01-14",
    payoutDate: null,
  },
  {
    id: "EARN-003",
    project: "API Development",
    client: "Enterprise Solutions",
    amount: 2400.0,
    hours: 32,
    rate: 75.0,
    method: "bank",
    status: "processing",
    date: "2024-01-12",
    payoutDate: null,
  },
  {
    id: "EARN-004",
    project: "Website Maintenance",
    client: "Local Business",
    amount: 950.0,
    hours: 15,
    rate: 63.33,
    method: "bank",
    status: "completed",
    date: "2024-01-10",
    payoutDate: "2024-01-12",
  },
]

export default function TalentPaymentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredEarnings = mockEarnings.filter((earning) => {
    const matchesSearch =
      earning.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || earning.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "bank":
        return <Building2 className="w-4 h-4" />
      case "mobile_money":
        return <Smartphone className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Loading skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Earnings & Payouts</h1>
          <p className="text-muted-foreground mt-1">Track your earnings and manage payout methods</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Payout Method
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${mockTalentStats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${mockTalentStats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockTalentStats.pendingPayouts}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockTalentStats.completedPayouts}</div>
            <p className="text-xs text-muted-foreground mt-1">Successful payouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Rate</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${mockTalentStats.averageHourlyRate}</div>
            <p className="text-xs text-muted-foreground mt-1">Per hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Earnings History</CardTitle>
                  <CardDescription>Your project earnings and payouts</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search earnings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payout Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEarnings.map((earning) => (
                    <TableRow key={earning.id}>
                      <TableCell>
                        <div className="font-medium text-foreground max-w-xs truncate">{earning.project}</div>
                        <div className="text-sm text-muted-foreground">{earning.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{earning.client}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">{earning.hours}h</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">${earning.rate}/hr</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">${earning.amount.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(earning.status)}
                          <Badge className={getStatusBadge(earning.status)}>{earning.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">
                          {earning.payoutDate ? new Date(earning.payoutDate).toLocaleDateString() : "Pending"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payout Methods */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Payout Methods</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Manage your payout preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPayoutMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getMethodIcon(method.type)}
                    <div>
                      <div className="font-medium text-foreground">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{method.details}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Progress</CardTitle>
              <CardDescription>Earnings goal: $5,000</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="text-sm font-medium text-foreground">
                    ${mockTalentStats.thisMonth.toLocaleString()}
                  </span>
                </div>
                <Progress value={(mockTalentStats.thisMonth / 5000) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {Math.round((mockTalentStats.thisMonth / 5000) * 100)}% of monthly goal
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Tax Documents
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                Update Rate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
