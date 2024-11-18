"use client"; 

import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "use-intl";

interface FilterRowProps {
  columns: string[]; 
  selectedColumns: string[];
  onColumnSelect: (column: string) => void; 
  searchTerm: string;
  onSearchChange: (value: string) => void; 
}

const columnLabels: { [key: string]: string } = {
  name: "Template Name",
  description: "Description",
  category: "Category",
  subject: "Subject",
  body_text: "Body Text",
  body_html: "Body HTML",
  template_key: "Template Key",
  active: "Active",
  variables: "Variables",
  sender_name: "Sender Name",
  sender_email: "Sender Email",
  reply_to: "Reply To",
  version: "Version",
};

const FilterRow: React.FC<FilterRowProps> = ({ columns, selectedColumns, onColumnSelect, searchTerm, onSearchChange }) => {
  const t = useTranslations('settings');

  return (
    <div className="flex justify-between items-center mb-4 mt-5 space-x-4">
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder= "Filter names..."
        variant="outline"
        className="max-w-sm ms-1"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-4 py-2 text-sm w-auto border border-gray-300 rounded-md hover:bg-gray-100">
          {t('administration.Columns')}<ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columns.map((column) => (
            <DropdownMenuItem
              key={column}
              onClick={() => onColumnSelect(column)}
              className="px-4 py-2 hover:bg-gray-200"
            >
              {selectedColumns.includes(column) ? `✓ ${columnLabels[column]}` : columnLabels[column]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterRow;
