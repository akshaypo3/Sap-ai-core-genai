import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addValue } from "@/lib/goals/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createValueSchema } from "@/schemas/createValueSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface goalFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateValueForm({
  goalId,
  open,
  setOpen,
}: {
  goalId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const goal = goalId;
  const goalId1 = goal.goal_id;
  console.log("", goalId1);

  function closeDialog() {
    setOpen(false);
  }

  const form = useForm({
    resolver: zodResolver(createValueSchema),
    defaultValues: {
      target_value: goal.target_value,
      baseline_value: goal.baseline_value,
      current_value: goal.current_value,
      unit_of_measure: goal.unit_of_measure,
      comments: goal.comments,
      status: goal.status ? "TRUE" : "FALSE", // Map status to TRUE or FALSE
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("goalId", goalId1?.toString());
    formData.append("target_value", data.target_value.toString());
    formData.append("baseline_value", data.baseline_value.toString());
    formData.append("current_value", data.current_value.toString());
    formData.append("unit_of_measure", data.unit_of_measure);
    formData.append("comments", data.comments);
    formData.append("status", data.status.toString());

    console.log("FormData:", formData);

    addValue(formData);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <FormField
          control={form.control}
          name="target_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Target Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baseline_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baseline Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Baseline Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="current_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Current Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TRUE">Completed</SelectItem>
                    <SelectItem value="FALSE">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit_of_measure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit of Measure</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Unit of Measure"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Comments" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-4" type="submit">
          Add Values
        </Button>
      </form>
    </Form>
  );
}
