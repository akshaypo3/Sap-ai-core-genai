import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Checkbox } from "@/components/ui/checkbox"; 

const AnswerTypeStep = () => {
  const { register, setValue, watch, formState, control } = useFormContext();
  const answerType = watch("answerType");

  const handleAnswerOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const optionsArray = value.split(",").map((option) => option.trim());
    setValue("answerOptions", optionsArray);
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
