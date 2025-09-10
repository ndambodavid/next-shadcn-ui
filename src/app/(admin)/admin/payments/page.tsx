"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Search,
  Download,
  Eye,
  MoreHorizontal,
  CreditCard,
  Smartphone,
  Building2,
} from "lucide-react"

// Mock data for admin payments dashboard
const mockPaymentStats = {
  totalRevenue: 125840.5,
  monthlyGrowth: 12.5,
  totalTransactions: 1247,
  activeUsers: 89,
  pendingPayments: 23,
  completedPayments: 1224,
}

const mockTransactions = [
  {
    id: "TXN-001",
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/professional-woman-diverse.png",
      type: "client",
    },
    project: "E-commerce Platform",
    amount: 2500.0,
    method: "bank",
    status: "completed",
    date: "2024-01-15",
    type: "project_payment",
  },
  {
    id: "TXN-002",
    user: { name: "Mike Chen", email: "mike@example.com", avatar: "/professional-man-developer.png", type: "talent" },
    project: "Mobile App Development",
    amount: 1800.0,
    method: "mobile_money",
    status: "pending",
    date: "2024-01-14",
    type: "talent_payout",
  },
  {
    id: "TXN-003",
    user: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/professional-woman-designer.png",
      type: "client",
    },
    project: "Brand Identity Design",
    amount: 950.0,
    method: "bank",
    status: "completed",
    date: "2024-01-13",
    type: "project_payment",
  },
  {
    id: "TXN-004",
    user: {
      name: "Alex Rodriguez",
      email: "alex@example.com",
      avatar: "/professional-man-backend.png",
      type: "talent",
    },
    project: "API Development",
    amount: 3200.0,
    method: "bank",
    status: "processing",
    date: "2024-01-12",
    type: "talent_payout",
  },
]

export default function AdminPaymentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
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
      <div className="p-6 space-y-6">
        {/* Loading skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${mockPaymentStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />+{mockPaymentStats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockPaymentStats.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockPaymentStats.completedPayments} completed, {mockPaymentStats.pendingPayments} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockPaymentStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Users with recent transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockPaymentStats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Payment Transactions</CardTitle>
              <CardDescription>Monitor all platform payment activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="project_payment">Project Payment</SelectItem>
                <SelectItem value="talent_payout">Talent Payout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{transaction.id}</div>
                    <div className="text-sm text-muted-foreground capitalize">{transaction.type.replace("_", " ")}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={transaction.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {transaction.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{transaction.user.name}</div>
                        <div className="text-sm text-muted-foreground">{transaction.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{transaction.project}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">${transaction.amount.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMethodIcon(transaction.method)}
                      <span className="capitalize text-foreground">{transaction.method.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(transaction.status)}>{transaction.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground">{new Date(transaction.date).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
