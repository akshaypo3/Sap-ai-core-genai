import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Custom input component
import { Checkbox } from "@/components/ui/checkbox";

const ValidationStep = () => {
  const { register, watch, formState } = useFormContext();
  const answerType = watch("answerType");  // Watch the answerType field

  return (
    <div className="space-y-4">
      {/* Minimum Length Input */}
      {answerType === "Text" && (
        <div>
          <label className="block text-sm font-medium">Minimum Length</label>
          <Input
            {...register("minLength", {
              valueAsNumber: true,
              min: 1,
              required: answerType === "Text" ? "Minimum length is required" : false,
            })}
            type="number"
            placeholder="Min length"
          />
          {formState.errors.minLength && (
            <p className="text-red-500 text-xs">{formState.errors.minLength.message}</p>
          )}
        </div>
      )}

      {/* Maximum Length Input */}
      {answerType === "Text" && (
        <div>
          <label className="block text-sm font-medium">Maximum Length</label>
          <Input
            {...register("maxLength", {
              valueAsNumber: true,
              required: answerType === "Text" ? "Maximum length is required" : false,
            })}
            type="number"
            placeholder="Max length"
          />
          {formState.errors.maxLength && (
            <p className="text-red-500 text-xs">{formState.errors.maxLength.message}</p>
          )}
        </div>
      )}

      {/* Is Required Checkbox */}
      <div>
        <label className="block text-sm font-medium">Is Required</label>
        <Checkbox
          {...register("isRequired")}
          className="h-5 w-5"
        />
        {formState.errors.isRequired && (
          <p className="text-red-500 text-xs">{formState.errors.isRequired.message}</p>
        )}
      </div>
    </div>
  );
};

export default ValidationStep;
