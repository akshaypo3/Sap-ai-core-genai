"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { DuplicateQuestion, updateSection } from "@/lib/settings/frameworkEditor/action";

// Section Interface
interface Section {
  section_id: string;
  section_code: string;
  section_name: string;
}

// Section Form Props
interface SectionFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionData: any;
  sections: Section[]; // Ensure sections is an array
}

export default function DuplicateQuestionForm({
  open,
  setOpen,
  questionData,
  sections = [], // Default to empty array if sections is undefined or null
}: SectionFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);  // Ensure null as the initial state for selected section
  const [openPopover, setOpenPopover] = useState(false);

  const form = useForm({
    defaultValues: {
      section: {
        section_id: "", // Set the section_id to an empty string to avoid default selection
        section_code: "",
        section_name: "", // Will be selected through the combobox
      },
      questionText: questionData?.question_text || "", // Default to question_text from backend
    },
  });

  // Function to handle section selection
  const handleSelectSection = (section: Section, field: any) => {
    setSelectedSection(section);  // Set the selected section
    field.onChange(section);      // Update the form value with the selected section
  };

  // Close dialog function
  const closeDialog = () => {
    setTimeout(() => setOpen(false), 100);
  };

  // Submit function
  const onSubmit = async (data: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("section_id", data.section.section_id);
    formData.append("section_code", data.section.section_code);
    formData.append("question_text", data.questionText || "");
    formData.append("help_text", questionData?.help_text || "");
    formData.append("question_type", questionData?.question_type);
    formData.append("is_required", questionData?.is_required);
    formData.append("answer_config", JSON.stringify(questionData.answer_config));
    formData.append("validation_rules", questionData?.validation_rules);
    formData.append("framework_id", questionData?.framework_id);
    formData.append("qu_columns",questionData?.qu_columns);

    await DuplicateQuestion(formData);
    setLoading(false);
    closeDialog();
  };

  useEffect(() => {
    setTimeout(() => {
        document.body.style.pointerEvents = "";
    }, 0);
}, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        {/* Section Combobox */}
        <div className="mb-1">
          <label className="block mb-1">Section</label>
          <Controller
            control={form.control}
            name="section"
            render={({ field }) => (
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className="w-[460px] justify-between"
                  >
                    {selectedSection
                      ? `${selectedSection.section_name} (${selectedSection.section_code})`
                      : "Select Section..."}  {/* No section pre-selected */}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[460px] p-0">
                  <Command>
                    <CommandInput placeholder="Search section..." />
                    <CommandList>
                      <CommandEmpty>No section found.</CommandEmpty>
                      <CommandGroup>
                {sections.map((section) => (
                  <CommandItem
                  style={{
                    left: 0,
                    zIndex: 1000,
                    maxHeight: "300px",
                    overflowY: "auto",
                    pointerEvents: "auto",
                  }}
                    key={section.section_id}
                    onSelect={() => handleSelectSection(section, field)} // Update selected section
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedSection?.section_id === section.section_id ? "opacity-100" : "opacity-0"}`}
                    />
                    {section.section_name} ({section.section_code})
                  </CommandItem>
                ))}
              </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Question Text Input */}
        <div>
          <label>Question Text</label>
          <Controller
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <Input type="text" placeholder="Enter the question" {...field} />
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex mt-5">
        <div className="flex-auto">
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Question"}
          </Button>
        </div>
      </div>
    </form>
  );
}
