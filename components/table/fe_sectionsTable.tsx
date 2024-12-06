"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpDown, Copy, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SectionActionMenu } from "../settings/frameworkEditor/FeSectionActionMenu";
import SectionOverview from "../settings/frameworkEditor/SectionJump";
import { Button } from "../ui/button";
import React from "react";
import { Input } from "../ui/input";

const SectionTable = ({ sections, frameworkId }) => {
  const [data, setData] = useState(sections);
  const [filteredData, setFilteredData] = useState(sections);
  const [sortOrder, setSortOrder] = useState({
    field: "name",
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    is_required: "all",
    name: "all",
    framework: "all",
  });

  const requiredFields = [
    { label: "All", value: "all" },
    { label: "Required", value: "true" },
    { label: "Unrequired", value: "false" },
  ];

  const tableRef = useRef<HTMLTableElement | null>(null);

  const handleNavigate = (id: string) => {
    if (tableRef.current) {
      const row = tableRef.current.querySelector(`tr[data-section-id="${id}"]`);
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  useEffect(() => {
    filterData(searchQuery, filters);
  }, [sections]);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    filterData(searchQuery, { ...filters, [name]: value });
  };

  const filterData = (query, appliedFilters) => {
    let filtered = data;

    if (query) {
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (appliedFilters.is_required && appliedFilters.is_required !== "all") {
      const isRequiredValue = appliedFilters.is_required === "true";
      filtered = filtered.filter(
        (item) => item.is_required === isRequiredValue,
      );
    }
    if (appliedFilters.name && appliedFilters.name !== "all") {
      filtered = filtered.filter((item) => item.name === appliedFilters.name);
    }
    if (appliedFilters.framework && appliedFilters.framework !== "all") {
      filtered = filtered.filter(
        (item) => item.framework === appliedFilters.framework,
      );
    }

    setFilteredData(filtered);
  };

  const handleSort = (field:any) => {
    let newDirection = "asc";
    if (sortOrder.field === field && sortOrder.direction === "asc") {
      newDirection = "desc";
    }
  
    const sortedData = [...filteredData].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      return newDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  
    setFilteredData(sortedData);
    setSortOrder({ field, direction: newDirection });
  };  

  const sectionData = filteredData.filter((section: any) => {
    const allIds = filteredData.map((item: any) => item.id);
    return (
      section.parent_section_id === null ||
      !allIds.includes(section.parent_section_id)
    );
  });

  return (
    <>
      {sectionData && sectionData.length > 0 && (
        <SectionOverview data={sectionData} onNavigate={handleNavigate} />
      )}

      <div className="mb-4 flex items-center gap-4 mt-9">
        <Input
          type="text"
          placeholder="Search sections..."
          className="border p-2 w-1/3"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="ml-auto flex gap-4 w-44">
          <Select
            name="is_required"
            value={filters.is_required !== "all" ? filters.is_required : ""}
            onValueChange={(value) =>
              handleFilterChange({ target: { name: "is_required", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              {requiredFields.map((required) => (
                <SelectItem key={required.value} value={required.value}>
                  {required.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
        <table
          ref={tableRef}
          className="min-w-full table-auto border-collapse border"
        >
          <thead>
            <tr>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Sr No.
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Section Code
              </th>
              <th
                className="bg-gray-100 dark:bg-neutral-800 p-3 text-center cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Section
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Description
              </th>
              <th
                className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Framework
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Required
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              // .filter((section: any) => {
              //   const allIds = filteredData.map((item: any) => item.id);
              //   return (
              //     section.parent_section_id === null ||
              //     !allIds.includes(section.parent_section_id)
              //   );
              // })
              // .filter((section: any) => section.parent_section_id === null )
              .filter((section: any) => {
                  const allIds = filteredData.map((item: any) => item.id);
                  return (
                    section.parent_section_id === null ||
                    !allIds.includes(section.parent_section_id)
                  );
                })
              .map((section: any, sectionIndex: number) => {
                const subsections = filteredData.filter(
                  (sub_section: any) =>
                    sub_section.parent_section_id === section.id,
                );

                return (
                  <React.Fragment key={section.id}>
                    <tr data-section-id={section.id}>
                      <td className="border p-3 text-center">
                        {sectionIndex + 1}
                      </td>
                      <td className="border p-3 text-center">
                        {section.section_code}
                      </td>
                      <td className="border p-3 text-center">{section.name}</td>
                      <td className="border p-3 text-center">
                        {section.description}
                      </td>
                      <td className="border p-3 text-center">
                        {section.fe_frameworks?.name || "Unknown"}
                      </td>
                      <td className="border p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded ${
                            section.is_required
                              ? "bg-blue-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {section.is_required ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="border p-3 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <SectionActionMenu
                            sectionData={section}
                            frameworkId={frameworkId}
                            parentSections={section.id}
                          />
                        </div>
                      </td>
                    </tr>

                    {subsections.length > 0 && (
                      <tr>
                        <td colSpan={7} className="border p-3">
                          <table className="min-w-full table-auto border-collapse border">
                            <thead>
                              <tr>
                                <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                  Sr No.
                                </th>
                                <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                                  Section Code
                                </th>
                                <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                  Sub Section
                                </th>
                                <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                  Description
                                </th>
                                <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                                  Required
                                </th>
                                <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {subsections.map(
                                (sub_section: any, subIndex: number) => {
                                  const subSubsections = filteredData.filter(
                                    (sub_sub: any) =>
                                      sub_sub.parent_section_id ===
                                      sub_section.id,
                                  );
                                  return (
                                    <React.Fragment key={sub_section.id}>
                                      <tr>
                                        <td className="border p-3 text-center">
                                          {`${sectionIndex + 1}.${
                                            subIndex + 1
                                          }`}
                                        </td>
                                        <td className="border p-3 text-center">
                                          {sub_section.section_code}
                                        </td>
                                        <td className="border p-3 text-center">
                                          {sub_section.name}
                                        </td>
                                        <td className="border p-3 text-center">
                                          {sub_section.description}
                                        </td>
                                        <td className="border p-3 text-center">
                                          <span
                                            className={`px-2 py-1 rounded ${
                                              sub_section.is_required
                                                ? "bg-blue-500 text-white"
                                                : "bg-green-500 text-white"
                                            }`}
                                          >
                                            {sub_section.is_required
                                              ? "Yes"
                                              : "No"}
                                          </span>
                                        </td>
                                        <td className="border p-3 text-center">
                                          <div className="flex justify-center items-center space-x-2">
                                            <SectionActionMenu
                                              sectionData={sub_section}
                                              frameworkId={frameworkId}
                                              parentSections={sub_section.id}
                                            />
                                          </div>
                                        </td>
                                      </tr>

                                      {subSubsections.length > 0 && (
                                        <tr>
                                          <td
                                            colSpan={7}
                                            className="border p-3"
                                          >
                                            <table className="min-w-full table-auto border-collapse border">
                                              <thead>
                                                <tr>
                                                  <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                                    Sr No.
                                                  </th>
                                                  <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                                                    Section Code
                                                  </th>
                                                  <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                                    Sub-sub Section
                                                  </th>
                                                  <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                                    Description
                                                  </th>
                                                  <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">
                                                    Required
                                                  </th>
                                                  <th className="bg-gray-100 dark:bg-neutral-700 p-3 text-center">
                                                    Actions
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {subSubsections.map(
                                                  (
                                                    sub_sub: any,
                                                    subSubIndex: number,
                                                  ) => (
                                                    <tr key={sub_sub.id}>
                                                      <td className="border p-3 text-center">
                                                        {`${sectionIndex + 1}.${
                                                          subIndex + 1
                                                        }.${subSubIndex + 1}`}
                                                      </td>
                                                      <td className="border p-3 text-center">
                                                        {sub_sub.section_code}
                                                      </td>
                                                      <td className="border p-3 text-center">
                                                        {sub_sub.name}
                                                      </td>
                                                      <td className="border p-3 text-center">
                                                        {sub_sub.description}
                                                      </td>
                                                      <td className="border p-3 text-center">
                                                        <span
                                                          className={`px-2 py-1 rounded ${
                                                            sub_sub.is_required
                                                              ? "bg-blue-500 text-white"
                                                              : "bg-green-500 text-white"
                                                          }`}
                                                        >
                                                          {sub_sub.is_required
                                                            ? "Yes"
                                                            : "No"}
                                                        </span>
                                                      </td>
                                                      <td className="border p-3 text-center">
                                                        <div className="flex justify-center items-center space-x-2">
                                                          <SectionActionMenu
                                                            sectionData={
                                                              sub_sub
                                                            }
                                                            frameworkId={
                                                              frameworkId
                                                            }
                                                            parentSections={
                                                              sub_section.id
                                                            }
                                                          />
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  ),
                                                )}
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  );
                                },
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SectionTable;
