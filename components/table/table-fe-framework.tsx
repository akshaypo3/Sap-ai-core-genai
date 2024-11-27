'use client'
import { useState, useEffect } from "react";
import { ArrowUpDown, Copy, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewFrameworkButton } from "../settings/frameworkEditor/Buttons";
import { DeleteFrameworkEditorButton, DuplicateFrameworkEditorButton, EditFrameworkEditorButton } from "../settings/frameworkEditor/Buttons";
import { Input } from "../ui/input";

const FETable = ({ frameworksData ,userId}) => {
  const [data, setData] = useState(frameworksData);
  const [filteredData, setFilteredData] = useState(frameworksData);
  const [sortOrder, setSortOrder] = useState({ field: "name", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",  // Use "all" as a default value for status
    type: "all",    // Use "all" as a default value for type
    year: "all",    // Use "all" as a default value for year
  });

  // Status options with labels (including "All" for deselection)
  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ];

  const uniqueTypes = Array.from(new Set(frameworksData.map(item => item.framework_type)));
  const uniqueYears = Array.from(new Set(frameworksData.map(item => item.reporting_year)));

  useEffect(() => {
    filterData(searchQuery, filters);
  }, [frameworksData]);

  const handleSearch = (e) => {
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

    // Filter by search query
    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by status, type, and year only if they are not "all"
    if (appliedFilters.status && appliedFilters.status !== "all") {
      filtered = filtered.filter((item) => item.status === appliedFilters.status);
    }
    if (appliedFilters.type && appliedFilters.type !== "all") {
      filtered = filtered.filter((item) => item.framework_type === appliedFilters.type);
    }
    if (appliedFilters.year && appliedFilters.year !== "all") {
      filtered = filtered.filter((item) => item.reporting_year === appliedFilters.year);
    }

    // Update the filtered data
    setFilteredData(filtered);
  };

  const handleSort = (field) => {
    let newDirection = "asc";
    if (sortOrder.field === field && sortOrder.direction === "asc") {
      newDirection = "desc"; // Toggle direction
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (field === "created_at") {
        return newDirection === "asc"
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      } else {
        return newDirection === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    setFilteredData(sortedData);
    setSortOrder({ field, direction: newDirection }); // Update the sort order state
  };


  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {/* Search bar on the left */}
        <Input
          type="text"
          placeholder="Search frameworks..."
          className="border p-2 w-1/3"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Filters section on the right with gap between the search input and filters */}
        <div className="ml-auto flex gap-4 w-1/3">
          <Select
            name="status"
            value={filters.status !== "all" ? filters.status : ""} // This will hold the selected value, defaults to "all" but shows placeholder when "all"
            onValueChange={(value) => handleFilterChange({ target: { name: "status", value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" /> {/* Static placeholder */}
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Type */}
          <Select
            name="type"
            value={filters.type !== "all" ? filters.type : ""} // This will hold the selected value, defaults to "all" but shows placeholder when "all"
            onValueChange={(value) => handleFilterChange({ target: { name: "type", value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" /> {/* Static placeholder */}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem> {/* 'All' for deselect option */}
              {uniqueTypes.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Year */}
          <Select
            name="year"
            value={filters.year !== "all" ? filters.year : ""} // This will hold the selected value, defaults to "all" but shows placeholder when "all"
            onValueChange={(value) => handleFilterChange({ target: { name: "year", value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" /> {/* Static placeholder */}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem> {/* 'All' for deselect option */}
              {uniqueYears.map((year, index) => (
                <SelectItem key={index} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th
                className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center"
                onClick={() => handleSort("name")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center">
                Framework Type
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">Version</th>
              <th
                className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center"
                onClick={() => handleSort("status")}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </th>
              <th
                className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center"
              >
                Reporting Year
              </th>
              <th
                className="bg-gray-100 dark:bg-neutral-800 cursor-pointer p-3 text-center"
                onClick={() => handleSort("created_at")}
              >
                Created Date
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </th>
              <th className="bg-gray-100 dark:bg-neutral-800 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((framework) => (
              <tr key={framework.id}>
                <td className="border p-3 text-center">{framework.name}</td>
                <td className="border p-3 text-center">{framework.framework_type}</td>
                <td className="border p-3 text-center">{framework.version}</td>
                <td className="border p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded ${framework.status === "active" ? "bg-green-500" : framework.status === "draft" ? "bg-yellow-500" : "bg-red-500"} text-white`}
                  >
                    {framework.status}
                  </span>
                </td>
                <td className="border p-3 text-center">{framework.reporting_year}</td>
                <td className="border p-3 text-center">{new Date(framework.created_at).toLocaleDateString()}</td>
                <td className="border p-3 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <EditFrameworkEditorButton frameworkData={framework} />
                  <DeleteFrameworkEditorButton frameworkId={framework} />
                  <DuplicateFrameworkEditorButton userId={userId} frameworkData={framework} />
                  <ViewFrameworkButton frameworkId={framework.id}/>
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FETable;
