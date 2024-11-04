"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie, Scatter } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  ArcElement,
  ScatterController,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslations } from "next-intl";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  ArcElement,
  ScatterController,
  Tooltip,
  Legend
);

export function Dashboard() {
  const upcomingDeadlines = [
    { date: 'Aug 15', event: 'Survey Distribution' },
    { date: 'Sep 30', event: 'Data Analysis' },
    { date: 'Oct 15', event: 'Stakeholder Workshop' },
    { date: 'Nov 30', event: 'Final Report' },
  ];

  const kpis = [
    { label: 'Survey Completion Rate', value: '85%' },
    { label: 'Material Topics Identified', value: '12' },
    { label: 'Stakeholder Groups Engaged', value: '5' },
    { label: 'New Topics Emerged', value: '3' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Materiality Matrix */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Materiality Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Scatter
            data={{
              datasets: [{
                label: 'Topics',
                data: [
                  { x: 4.2, y: 3.8, label: 'Climate Change' },
                  { x: 3.9, y: 4.5, label: 'Employee Safety' },
                  { x: 3.5, y: 3.2, label: 'Ethical Business Practices' },
                  { x: 4.7, y: 2.8, label: 'Innovation' },
                  { x: 2.8, y: 3.0, label: 'Diversity & Inclusion' },
                  { x: 3.2, y: 3.7, label: 'Supply Chain Management' },
                  { x: 4.0, y: 4.2, label: 'Energy Efficiency' },
                  { x: 3.6, y: 2.5, label: 'Community Engagement' },
                  { x: 2.5, y: 4.0, label: 'Data Privacy' },
                  { x: 3.8, y: 3.5, label: 'Waste Reduction' },
                  { x: 3.0, y: 2.7, label: 'Water Management' },
                  { x: 4.5, y: 3.0, label: 'Product Quality' },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                pointRadius: 8,
                pointHoverRadius: 10,
              }]
            }}
            options={{
              scales: {
                x: { 
                  type: 'linear',
                  position: 'bottom',
                  title: { display: true, text: 'Impact on Business' },
                  min: 0,
                  max: 5,
                },
                y: { 
                  type: 'linear',
                  title: { display: true, text: 'Importance to Stakeholders' },
                  min: 0,
                  max: 5,
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => context.raw.label
                  }
                }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Top 5 Material Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Material Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={{
              labels: ['Employee Safety', 'Climate Change', 'Energy Efficiency', 'Ethical Practices', 'Innovation'],
              datasets: [{
                label: 'Score',
                data: [4.5, 4.2, 4.2, 3.5, 4.7],
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
              }]
            }}
            options={{ 
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  max: 5,
                }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Stakeholder Engagement Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie
            data={{
              labels: ['Employees', 'Investors', 'Customers', 'Suppliers', 'Community'],
              datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)'
                ]
              }]
            }}
          />
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span className="text-sm text-gray-500">{kpi.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {upcomingDeadlines.map((deadline, index) => (
              <li key={index}>{deadline.date} - {deadline.event}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Survey Response Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Response Rate</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-blue-500  progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="50.24"
                transform="rotate(-90 50 50)"
              ></circle>
              <text x="50" y="50" fontFamily="Verdana" fontSize="20" textAnchor="middle" alignmentBaseline="middle">80%</text>
            </svg>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}