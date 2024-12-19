import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Checkbox } from "@/components/ui/checkbox"; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const AnswerTypeStep = () => {
  const { register, setValue, watch, formState, control } = useFormContext();
  const [rows, setRows] = useState([]);
  const answerType = watch("answerType");

  useEffect(() => {
    const savedRows = watch("answerOptionsTable") || [];
    setRows(savedRows);
  }, [watch]);

  const handleAnswerOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const optionsArray = value.split(",").map((option) => option.trim());
    setValue("answerOptions", optionsArray);
  };

  const handleAddRow = () => {
    const newRow = { column: "", type: "Text", options: "" };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    setValue("answerOptionsTable", updatedRows); 
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    setValue("answerOptionsTable", updatedRows); 
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    setValue("answerOptionsTable", updatedRows); 
  };

  return (
    <div className="space-y-4">
      {answerType === "MultipleChoice" && (
        <div>
          <label className="block text-sm font-medium">Answer Options</label>
          <Textarea
            onChange={handleAnswerOptionsChange}
            placeholder="e.g., Option 1, Option 2"
            rows={3}
            value={watch("answerOptions")?.join(", ")}
          />
          {formState.errors.answerOptions && (
            <p className="text-red-500 text-xs">{formState.errors.answerOptions.message}</p>
          )}
        </div>
      )}

      {answerType === "Text" && (
        <div>
          <label className="block text-sm font-medium">Minimum Length</label>
          <Input
            {...register("minLength", {
              valueAsNumber: true,
              min: 1,
              required: "Minimum length is required",
            })}
            type="number"
            placeholder="Min length"
          />
          {formState.errors.minLength && (
            <p className="text-red-500 text-xs">{formState.errors.minLength.message}</p>
          )}

          <label className="block text-sm font-medium mt-3">Maximum Length</label>
          <Input
            {...register("maxLength", {
              valueAsNumber: true,
              max: 500,
              required: "Maximum length is required",
            })}
            type="number"
            placeholder="Max length"
          />
          {formState.errors.maxLength && (
            <p className="text-red-500 text-xs">{formState.errors.maxLength.message}</p>
          )}
        </div>
      )}

      {answerType === "Table" && (
        <div>
        <label className="block text-sm font-medium mb-3">Answer Options</label>

        <div className="mb-4">
          <Button
            type="button"
            onClick={handleAddRow}
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            Add Column
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead>Column</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="px-4 py-2 border border-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center border border-gray-300">
                    No columns available, You can add columns by clicking on above button
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        type="text"
                        value={row.column}
                        placeholder="Column Name"
                        onChange={(e) =>
                          handleRowChange(index, "column", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </TableCell>

                    <TableCell>
                      <Select
                        value={row.type}
                        onValueChange={(value) => handleRowChange(index, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Text">Text</SelectItem>
                          <SelectItem value="Dropdown">Dropdown</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Input
                        type="text"
                        value={row.options}
                        placeholder="eg. ans1, ans2"
                        onChange={(e) =>
                          handleRowChange(index, "options", e.target.value)
                        }
                        disabled={row.type !== "Dropdown"}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </TableCell>

                    <TableCell className="px-4 py-2 border border-gray-300">
                      <Button
                        type="button"
                        onClick={() => handleDeleteRow(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      )}

      <div>
        <label className="block text-sm font-medium">Is Required</label>
        <Controller
          control={control}
          name="isRequired"
          render={({ field }) => (
            <Checkbox
                      checked={field.value} 
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="h-6 w-6" 
                    />
          )}
        />
        {formState.errors.isRequired && (
          <p className="text-red-500 text-xs">{formState.errors.isRequired.message}</p>
        )}
      </div>
    </div>
  );
};

export default AnswerTypeStep;