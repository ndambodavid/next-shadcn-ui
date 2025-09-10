"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  CreditCard,
  Calendar,
  Download,
  Plus,
  Search,
  Building2,
  Smartphone,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Loading from "./loading"

// Mock data for client payments
const mockClientStats = {
  totalSpent: 15750.0,
  pendingPayments: 2,
  completedPayments: 12,
  savedMethods: 3,
}

const mockPaymentMethods = [
  {
    id: "pm-001",
    type: "bank",
    name: "Business Checking",
    details: "****1234",
    isDefault: true,
  },
  {
    id: "pm-002",
    type: "mobile_money",
    name: "MTN Mobile Money",
    details: "+256 *** ***789",
    isDefault: false,
  },
  {
    id: "pm-003",
    type: "card",
    name: "Visa Credit Card",
    details: "****5678",
    isDefault: false,
  },
]

const mockTransactions = [
  {
    id: "PAY-001",
    project: "E-commerce Platform Development",
    amount: 5000.0,
    method: "bank",
    status: "completed",
    date: "2024-01-15",
    invoice: "INV-2024-001",
  },
  {
    id: "PAY-002",
    project: "Mobile App UI/UX Design",
    amount: 2500.0,
    method: "mobile_money",
    status: "pending",
    date: "2024-01-14",
    invoice: "INV-2024-002",
  },
  {
    id: "PAY-003",
    project: "Brand Identity Package",
    amount: 1800.0,
    method: "card",
    status: "completed",
    date: "2024-01-10",
    invoice: "INV-2024-003",
  },
  {
    id: "PAY-004",
    project: "Website Maintenance",
    amount: 750.0,
    method: "bank",
    status: "processing",
    date: "2024-01-08",
    invoice: "INV-2024-004",
  },
]

export default function ClientPaymentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // form state
  const [newMethodType, setNewMethodType] = useState("")
  const [newMethodName, setNewMethodName] = useState("")
  const [newMethodDetails, setNewMethodDetails] = useState("")


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoice.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

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

  const handleAddPaymentMethod = () => {
    console.log("New method:", { newMethodType, newMethodName, newMethodDetails })
    // TODO: integrate API call here
    setIsAddModalOpen(false)
    setNewMethodType("")
    setNewMethodName("")
    setNewMethodDetails("")
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${mockClientStats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockClientStats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Payments</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockClientStats.completedPayments}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockClientStats.savedMethods}</div>
            <p className="text-xs text-muted-foreground mt-1">Saved methods</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Payment History</CardTitle>
                  <CardDescription>Your recent payment transactions</CardDescription>
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
                    placeholder="Search payments..."
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
                    <TableHead>Payment</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium text-foreground">{transaction.id}</div>
                        <div className="text-sm text-muted-foreground">{transaction.invoice}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground max-w-xs truncate">{transaction.project}</div>
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
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          <Badge className={getStatusBadge(transaction.status)}>{transaction.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">{new Date(transaction.date).toLocaleDateString()}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Payment Methods</CardTitle>
                <Button onClick={() => setIsAddModalOpen(true)} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPaymentMethods.map((method) => (
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

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Payment
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Receipts
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CreditCard className="w-4 h-4 mr-2" />
                Update Billing Info
              </Button>
            </CardContent>
          </Card>


        </div>
      </div>

      {/* ✅ Add Payment Method Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Save a new payment method for faster checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={newMethodType} onValueChange={setNewMethodType}>
              <SelectTrigger>
                <SelectValue placeholder="Select method type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Method name (e.g. Visa, MTN Wallet)"
              value={newMethodName}
              onChange={(e) => setNewMethodName(e.target.value)}
            />

            <Input
              placeholder="Details (e.g. ****1234 or phone number)"
              value={newMethodDetails}
              onChange={(e) => setNewMethodDetails(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} disabled={!newMethodType || !newMethodName}>
              Save Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
