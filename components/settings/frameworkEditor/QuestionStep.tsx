import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Custom input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select component

const QuestionStep = () => {
  const { control, formState } = useFormContext(); // Access form context

  return (
    <div className="grid w-full items-center gap-1.5 mb-2">
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
            <Select value={field.value} onValueChange={field.onChange}> {/* Make sure to pass field.value and field.onChange */}
              <SelectTrigger>
                <SelectValue placeholder="Select Answer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="Numeric">Numeric</SelectItem>
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
          name="helpText"  // This is the name of the field
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
