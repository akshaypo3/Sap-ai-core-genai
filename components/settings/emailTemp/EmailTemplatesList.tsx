"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEmailTemplates, deleteEmailTemplate } from "@/lib/settings/emailtemplates/action"; 
import AddEmailButton from "./AddEmailButton";
import FilterRow from "./FilterRow"; 
import DeleteEmailTemplateModal from "@/components/settings/emailTemp/DeleteEmailTemplateModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "use-intl";
import SendMailForm from "./SendMailForm";

interface EmailTemplatesListProps {
  emailTemplatesData: any[];
}

const EmailTemplatesList: React.FC<EmailTemplatesListProps> = ({ emailTemplatesData }) => {
  const router = useRouter(); 
  const [emailTemplates, setEmailTemplates] = useState(emailTemplatesData);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [selectedColumns, setSelectedColumns] = useState<string[]>(["name", "description"]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<any>(null);

  const columns = [
    "name",
    "description",
    "category",
    "subject",
    "body_text",
    "body_html",
    "template_key",
    "active",
    "variables",
    "sender_name",
    "sender_email",
    "reply_to",
    "version",
  ];

  // useEffect(() => {
  //   const getEmailTemplates = async () => {
  //     try {
  //       const data = await fetchEmailTemplates();
  //       setEmailTemplates(data);
  //     } catch (error) {
  //       console.error("Error fetching email templates:", error);
  //     }
  //     setLoading(false);
  //   };

  //   getEmailTemplates();
  // }, []);

  const handleSearchChange = (value: string) => setSearchTerm(value);

  const handleColumnSelect = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleDeleteClick = (template: any) => {
    setTemplateToDelete(template);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (templateToDelete) {
      try {
        await deleteEmailTemplate(templateToDelete.id); 
        setEmailTemplates(emailTemplates.filter((t) => t.id !== templateToDelete.id));
      } catch (error) {
        console.error("Error deleting template:", error);
      }
      setDeleteModalOpen(false);
      setTemplateToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setTemplateToDelete(null);
  };

  const handleEditClick = (template: any) => {
    router.push(`/settings/administration/${template.id}`);
  };

  const filteredTemplates = emailTemplates.filter((template) =>
    selectedColumns.some((column) => {
      const field = template[column];
      return field && String(field).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );
  const t = useTranslations('settings');
  return (
    <div className="overflow-x-auto">
      <AddEmailButton />
      <FilterRow
        columns={columns}
        selectedColumns={selectedColumns}
        onColumnSelect={handleColumnSelect}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Table className="border border-gray-300 dark:border-neutral-800 rounded-lg overflow-hidden w-full">
            <TableHeader className="bg-gray-100 dark:bg-neutral-800">
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`px-6 py-4 min-w-[150px] ${!selectedColumns.includes(column) ? "hidden" : ""}`}
                  >
                    {selectedColumns.includes(column)
                      ? column
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")
                      : null}
                  </TableHead>
                ))}
                <TableHead className="px-6 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      className={`px-6 py-4 ${!selectedColumns.includes(column) ? "hidden" : ""}`}
                    >
                      {column === "active" ? String(template[column]) :
                        typeof template[column] === "object" && template[column] !== null
                          ? JSON.stringify(template[column]) 
                          : template[column]
                      }
                    </TableCell>
                  ))}
                  <TableCell className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="px-3 border-none">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(template)}>{t('administration.Edit')}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(template)}>{t('administration.Delete')}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <DeleteEmailTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        templateName={templateToDelete?.name}
      />
      {/* <SendMailForm/> */}
    </div>
  );
};

export default EmailTemplatesList;
