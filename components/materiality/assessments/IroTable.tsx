"use client"

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { MarkAsNotMaterialButton } from "@/components/materiality/assessments/buttons";

type Stakeholder = {
  id: string;
  name: string;
};

type AssessmentItem = {
  id: string;
  code: string;
  topic: string;
  sub_topic: string;
  sub_sub_topic: string;
  status: 'Material' | 'Not Material' | 'To Be Assessed' | 'Under Review';
  impact_score?: number;
  financial_score?: number;
  assignedPerson: string;
  stakeholders: Stakeholder[];
  is_material: boolean;
  materiality_type: string | null;
};



type GroupedData = {
  [key: string]: {
    items: AssessmentItem[];
    stats: {
      material: number;
      notMaterial: number;
      toBeAssessed: number;
      underReview: number;
    };
  };
};

export default function IroTable({ assessmentData, assessmentId }) {
  const router = useRouter();
  // Group the assessment data by ESRS source (code)
  const initialGroupedData: GroupedData = assessmentData.reduce((acc, item) => {
    const { code } = item;
    if (!acc[code]) {
      acc[code] = {
        items: [],
        stats: { material: 0, notMaterial: 0, toBeAssessed: 0, underReview: 0 }
      };
    }
    
    const status = getStatus(item);
    acc[code].items.push({
      ...item,
      status,
      assignedPerson: "Kevin Renner",
    });
    acc[code].stats[getStatusKey(status)]++;
    
    return acc;
  }, {});

  const [groupedData, setGroupedData] = useState<GroupedData>(initialGroupedData);
  const [expandedSections, setExpandedSections] = useState<string[]>(Object.keys(initialGroupedData));


  // const handleMarkNotMaterial = (code: string, id: string) => {
  //   setGroupedData(prevData => {
  //     const newData = { ...prevData };
  //     const item = newData[code].items.find(i => i.id === id);
  //     if (item && item.status !== 'Not Material') {
  //       newData[code].stats[getStatusKey(item.status)]--;
  //       newData[code].stats.notMaterial++;
  //       item.status = 'Not Material';
  //     }
  //     return newData;
  //   });
  // };

  const getStatusColor = (status: AssessmentItem['status']) => {
    switch (status) {
      case 'Material':
        return 'bg-yellow-100 text-orange-800';
      case 'Not Material':
        return 'bg-gray-100 text-gray-800';
      case 'Under Review':
        return 'bg-red-100 text-red-800';
      case 'To Be Assessed':
        return 'bg-blue-100 text-blue-800';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleEdit = (id: string) => {
    router.push(`/materiality/assessments/${assessmentId}/${id}`);
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      {Object.entries(groupedData).map(([code, { items, stats }]) => (
        <div key={code} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection(code)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">ESRS {code}</h3>
              {expandedSections.includes(code) ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-yellow-50">Material: {stats.material}</Badge>
              <Badge variant="outline" className="bg-green-50">Not Material: {stats.notMaterial}</Badge>
              <Badge variant="outline" className="bg-blue-50">To Be Assessed: {stats.toBeAssessed}</Badge>
              <Badge variant="outline" className="bg-red-50">Under Review: {stats.underReview}</Badge>
            </div>
          </div>
          {expandedSections.includes(code) && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact Score</TableHead>
                  <TableHead>Financial Score</TableHead>
                  <TableHead>Assigned Person</TableHead>
                  <TableHead>Stakeholders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.topic}</p>
                        {item.sub_topic && (
                          <p className="text-sm text-gray-500">{item.sub_topic}</p>
                        )}
                        {item.sub_sub_topic && (
                          <p className="text-xs text-gray-400">{item.sub_sub_topic}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{item.impact_score?.toFixed(2) || '-'}</TableCell>
                    <TableCell>{item.financial_score?.toFixed(2) || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={item.assignedPerson} />
                          <AvatarFallback>{item.assignedPerson.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{item.assignedPerson}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.stakeholders && item.stakeholders.length > 0 ? (
                          item.stakeholders.map((stakeholder) => (
                            <Badge key={stakeholder.id} variant="secondary" className="text-xs">
                              {stakeholder.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-400">No stakeholders assigned</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {/* {item.status !== 'Not Material' && (
                        <MarkAsNotMaterialButton 
                          assessmentId={assessmentId} 
                          iroId={item.id} 
                        />
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
    </div>
  );
}

function getStatus(item): AssessmentItem['status'] {
  if (item.status) return item.status as AssessmentItem['status'];
  if (item.is_material === true) return 'Material';
  if (item.materiality_type) return 'Under Review';
  return 'To Be Assessed';
}

function getStatusKey(status: AssessmentItem['status']): keyof GroupedData[string]['stats'] {
  switch (status) {
    case 'Material': return 'material';
    case 'Not Material': return 'notMaterial';
    case 'To Be Assessed': return 'toBeAssessed';
    case 'Under Review': return 'underReview';
  }
}

