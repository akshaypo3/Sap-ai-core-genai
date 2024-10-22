"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WaterConsumptionChart = () => {
  const data = [
    { year: 2019, consumption: 100 },
    { year: 2020, consumption: 98 },
    { year: 2021, consumption: 95 },
    { year: 2022, consumption: 92 },
    { year: 2023, consumption: 90 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Consumption Reduction</CardTitle>
        <CardDescription>Goal: 50% reduction by 2030</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <ChartTooltip />
            <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <p>Current progress: 10% reduction achieved</p>
      </CardFooter>
    </Card>
  );
};

const RenewableEnergyChart = () => {
  const data = [
    { year: 2019, percentage: 10 },
    { year: 2020, percentage: 15 },
    { year: 2021, percentage: 22 },
    { year: 2022, percentage: 28 },
    { year: 2023, percentage: 35 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renewable Energy Usage</CardTitle>
        <CardDescription>Goal: 100% renewable energy by 2035</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="percentage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <p>Current progress: 35% renewable energy achieved</p>
      </CardFooter>
    </Card>
  );
};

const CarbonEmissionsChart = () => {
  const data = [
    { year: 2019, emissions: 100 },
    { year: 2020, emissions: 98 },
    { year: 2021, emissions: 97 },
    { year: 2022, emissions: 95 },
    { year: 2023, emissions: 93 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Emissions Reduction</CardTitle>
        <CardDescription>Goal: 40% reduction from 2020 levels by 2040</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <ChartTooltip />
            <Line type="monotone" dataKey="emissions" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <p>Current progress: 7% reduction achieved</p>
      </CardFooter>
    </Card>
  );
};

const SustainabilityGoals = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <WaterConsumptionChart />
      <RenewableEnergyChart />
      <CarbonEmissionsChart />
    </div>
  );
};

export default SustainabilityGoals;