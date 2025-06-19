"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Server,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  BarChart3,
  Settings,
  Download,
} from "lucide-react"

export default function CloudMonitoringDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")

  // Mock data for demonstration
  const overviewMetrics = {
    totalCost: 12847.32,
    monthlyCostChange: -8.2,
    activeResources: 247,
    resourceChange: 12,
    efficiency: 87,
    efficiencyChange: 5.3,
    alerts: 3,
  }

  const resourceUsage = [
    { name: "Compute (EC2)", usage: 78, cost: 4250.0, instances: 45, status: "optimal" },
    { name: "Storage (S3)", usage: 65, cost: 2100.5, instances: 12, status: "warning" },
    { name: "Database (RDS)", usage: 82, cost: 3200.75, instances: 8, status: "optimal" },
    { name: "Network (CloudFront)", usage: 45, cost: 890.25, instances: 15, status: "optimal" },
    { name: "Lambda Functions", usage: 35, cost: 156.8, instances: 128, status: "underutilized" },
  ]

  const costOptimizations = [
    {
      type: "Right-sizing",
      description: "3 EC2 instances are over-provisioned",
      potential: 450.0,
      priority: "high",
    },
    {
      type: "Reserved Instances",
      description: "Convert 12 on-demand instances to reserved",
      potential: 1200.0,
      priority: "high",
    },
    {
      type: "Storage Optimization",
      description: "Move infrequently accessed data to cheaper storage",
      potential: 320.5,
      priority: "medium",
    },
    {
      type: "Unused Resources",
      description: "5 idle load balancers detected",
      potential: 125.0,
      priority: "low",
    },
  ]

  const alerts = [
    {
      type: "cost",
      severity: "high",
      message: "Monthly spend projected to exceed budget by 15%",
      time: "2 hours ago",
    },
    {
      type: "performance",
      severity: "medium",
      message: "Database CPU utilization above 85% for 30 minutes",
      time: "4 hours ago",
    },
    {
      type: "security",
      severity: "low",
      message: "3 security groups with overly permissive rules",
      time: "1 day ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "underutilized":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "underutilized":
        return <TrendingDown className="h-4 w-4 text-blue-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cloud Resource Monitor</h1>
            <p className="text-gray-600">Springer Cloud Infrastructure Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${overviewMetrics.totalCost.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
                {Math.abs(overviewMetrics.monthlyCostChange)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Resources</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewMetrics.activeResources}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-blue-600" />+{overviewMetrics.resourceChange} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewMetrics.efficiency}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />+{overviewMetrics.efficiencyChange}% improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewMetrics.alerts}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources">Resource Usage</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization Overview</CardTitle>
                <CardDescription>Real-time monitoring of cloud resources across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resourceUsage.map((resource, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(resource.status)}
                          <span className="font-medium">{resource.name}</span>
                          <Badge variant="outline" className={getStatusColor(resource.status)}>
                            {resource.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${resource.cost.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{resource.instances} instances</div>
                        </div>
                      </div>
                      <Progress value={resource.usage} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{resource.usage}% utilized</span>
                        <span>Monthly cost</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown by Service</CardTitle>
                  <CardDescription>Monthly spending distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceUsage.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-sm">{resource.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${resource.cost.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {((resource.cost / overviewMetrics.totalCost) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Trends</CardTitle>
                  <CardDescription>Historical spending patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-green-800">Cost Savings</div>
                        <div className="text-sm text-green-600">This month vs last month</div>
                      </div>
                      <div className="text-2xl font-bold text-green-800">-$1,127</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average daily spend</span>
                        <span className="font-medium">$428.24</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Projected monthly total</span>
                        <span className="font-medium">$12,847</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Budget remaining</span>
                        <span className="font-medium text-green-600">$2,153</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Recommendations</CardTitle>
                <CardDescription>
                  Potential savings: ${costOptimizations.reduce((sum, opt) => sum + opt.potential, 0).toLocaleString()}
                  /month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costOptimizations.map((optimization, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{optimization.type}</span>
                          <Badge
                            variant={
                              optimization.priority === "high"
                                ? "destructive"
                                : optimization.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {optimization.priority} priority
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${optimization.potential.toLocaleString()}/mo</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{optimization.description}</p>
                      <Button size="sm" variant="outline">
                        Apply Optimization
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <Alert
                        key={index}
                        className={
                          alert.severity === "high"
                            ? "border-red-200 bg-red-50"
                            : alert.severity === "medium"
                              ? "border-yellow-200 bg-yellow-50"
                              : "border-blue-200 bg-blue-50"
                        }
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="flex items-center justify-between">
                          <span className="capitalize">{alert.type} Alert</span>
                          <Badge
                            variant={
                              alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </AlertTitle>
                        <AlertDescription>
                          {alert.message}
                          <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall infrastructure status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Compute Services</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Storage Services</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Network Services</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Database Services</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
