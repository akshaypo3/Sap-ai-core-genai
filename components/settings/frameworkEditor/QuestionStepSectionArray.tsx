import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Section {
  section_id: string;
  section_code: string;
  section_name: string;
}

interface QuestionStepProps {
  sections: Section[];
}

const QuestionStep = ({ sections }: QuestionStepProps) => {
  const { control, formState } = useFormContext(); // Access form context
  const [selectedSection, setSelectedSection] = React.useState<Section | null>(null);
  const [open, setOpen] = React.useState(false); // State for controlling Popover visibility

  // Function to handle selection of section
  const handleSelectSection = (section: Section, field: any) => {
    setSelectedSection(section);
    field.onChange(section);
  };
  useEffect(() => {
    setTimeout(() => {
        document.body.style.pointerEvents = "";
    }, 0);
}, []);

  return (
    <div className="grid w-full items-center gap-1.5 mb-2">

      {/* Section Combobox */}
      <div className="mb-1">
  <label className="block mb-1">Section</label> {/* Ensure the label is block-level */}
  <Controller
    control={control}
    name="section" // Name the field as 'section' in react-hook-form
    render={({ field }) => (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[460px] justify-between" // Combobox button styling
          >
            {selectedSection
              ? `${selectedSection.section_name} (${selectedSection.section_code})`
              : "Select Section..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[460px] p-0">
          <Command>
            <CommandInput placeholder="Search section..." />
            <CommandList >
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
  {formState.errors?.section && (
    <p className="text-red-500 text-sm">{formState.errors.section.message}</p>
  )}
</div>


      {/* Question Text Input */}
      <div>
        <label>Question Text</label>
        <Controller
          control={control}
          name="questionText"
          render={({ field }) => (
            <Input type="text" placeholder="Enter the question" {...field} />
          )}
        />
        {formState.errors?.questionText && (
          <p className="text-red-500 text-sm">{formState.errors.questionText.message}</p>
        )}
      </div>

      
      {/* Answer Type Selection */}
      <div>
        <label>Answer Type</label>
        <Controller
          control={control}
          name="answerType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Answer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="MultipleChoice">Multiple Choice</SelectItem>
                <SelectItem value="Checkbox">Checkbox</SelectItem>
                <SelectItem value="Table">Table</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {formState.errors?.answerType && (
          <p className="text-red-500 text-sm">{formState.errors.answerType.message}</p>
        )}
      </div>

      {/* Help Text Input */}
      <div>
        <label className="block text-sm font-medium">Help Text</label>
        <Controller
          control={control}
          name="helpText" // This is the name of the field
          render={({ field }) => (
            <Input type="text" placeholder="Enter help text" {...field} />
          )}
        />
        {formState.errors?.helpText && (
          <p className="text-red-500 text-sm">{formState.errors.helpText.message}</p>
        )}
      </div>
    </div>
  );
};

export default QuestionStep;
