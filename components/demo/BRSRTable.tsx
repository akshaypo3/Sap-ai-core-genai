"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, ChevronDown, ChevronRight } from 'lucide-react';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type DataPoint = {
  id: string;
  question: string;
  section: string;
  principle: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Under Review';
  assignedUser?: User;
};

type GroupedData = {
  [key: string]: {
    [key: string]: DataPoint[];
  };
};

const defaultUser: User = {
  id: '1',
  name: 'Kevin Renner',
  avatar: '/avatars/kevin.png',
};

const sectionOrder = [
  'Section A: General Disclosures',
  'Section B: Management and Process Disclosures',
  'Section C: Principle-wise Performance Disclosure'
];

const BRSRTable = ({ brsrData }: { brsrData: DataPoint[] }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedPrinciples, setExpandedPrinciples] = useState<string[]>([]);

  const groupedData: GroupedData = brsrData.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = {};
    }
    if (!acc[item.section][item.principle]) {
      acc[item.section][item.principle] = [];
    }
    acc[item.section][item.principle].push(item);
    return acc;
  }, {});

  const sortedSections = Object.keys(groupedData).sort((a, b) =>
    sectionOrder.indexOf(a) - sectionOrder.indexOf(b)
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const togglePrinciple = (principle: string) => {
    setExpandedPrinciples(prev =>
      prev.includes(principle)
        ? prev.filter(p => p !== principle)
        : [...prev, principle]
    );
  };

  const getStatusColor = (status: DataPoint['status']) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      {sortedSections.map((section) => (
        <div key={section} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection(section)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">{section}</h3>
              {expandedSections.includes(section) ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </div>
          {expandedSections.includes(section) && (
            <div className="p-4">
              {/* Check if it's Section A or Section B to display the table directly */}
              {(section === 'Section A: General Disclosures' || section === 'Section B: Management and Process Disclosures') ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Question</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedData[section] &&
                      Object.values(groupedData[section]).flat().map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.question}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={item.assignedUser?.avatar || defaultUser.avatar} alt={item.assignedUser?.name || defaultUser.name} />
                                <AvatarFallback>{(item.assignedUser?.name || defaultUser.name).split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span>{item.assignedUser?.name || defaultUser.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {/* <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button> */}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                // Render principles (for Section C)
                Object.entries(groupedData[section])
                  .sort(([principleA], [principleB]) => {
                    const numA = parseInt(principleA.match(/\d+/)?.[0] || '0', 10);
                    const numB = parseInt(principleB.match(/\d+/)?.[0] || '0', 10);
                    return numA - numB;
                  })
                  .map(([principle, items]) => (
                    <div key={principle} className="mb-4">
                      <div 
                        className="flex items-center justify-between p-2 bg-gray-100 cursor-pointer"
                        onClick={() => togglePrinciple(principle)}
                      >
                        <h4 className="text-lg font-medium">{principle !== 'N/A' ? principle : ''}</h4>
                        {expandedPrinciples.includes(principle) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                      {expandedPrinciples.includes(principle) && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/2">Question</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Assigned To</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.question}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={item.assignedUser?.avatar || defaultUser.avatar} alt={item.assignedUser?.name || defaultUser.name} />
                                      <AvatarFallback>{(item.assignedUser?.name || defaultUser.name).split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <span>{item.assignedUser?.name || defaultUser.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {/* <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                  </Button> */}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BRSRTable;
