"use client"

import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createGoal } from "@/lib/goals/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { goalFormSchema  } from "@/schemas/goalFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

interface goalFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateGoalForm({ open, setOpen}: goalFormProps) {

  function closeDialoge(){
    wait().then(() => setOpen(false));
}

const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
    name: "",
    description: "",
    // target_value: 0,
    unit_of_measure: "",
    start_date: "",
    end_date: "",
    // baseline_value: 0,
    // current_value: 0,
    owner: "",
    status: "FALSE",
    key_actions: "",
    frequency_of_measurement: "",
    completion_date: "",
    risks: "",
    comments: "",
    visualization: "Bar Graph",
    },
});

const onSubmit = async (data: z.infer<typeof goalFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("target_value", data.target_value.toString());
    formData.append("unit_of_measure", data.unit_of_measure);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("baseline_value", data.baseline_value.toString());
    formData.append("current_value", data.current_value.toString());
    formData.append("owner", data.owner);
    formData.append("status", data.status);
    formData.append("key_actions", data.key_actions);
    formData.append("frequency_of_measurement", data.frequency_of_measurement);
    formData.append("completion_date", data.completion_date);
    formData.append("risks", data.risks);
    formData.append("comments", data.comments);
    formData.append("visualization", data.visualization || "");
  
    await createGoal(formData);
    closeDialoge()
};

const t = useTranslations('goals')
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`p-4`}
    >
      <div className="grid w-full items-center gap-1.5 mb-2">
      <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Goal Name")}</FormLabel>
          <FormControl>
            <Input placeholder="Goal Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Description")}</FormLabel>
          <FormControl>
            <Input placeholder="Description" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="target_value"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Target Value")}</FormLabel>
          <FormControl>
            <Input
              placeholder="Target Value"
              {...field}
            />
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
          <FormLabel>{t("Unit of Measure")}</FormLabel>
          <FormControl>
            <Input placeholder="Unit of Measure" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="start_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Start Date")}</FormLabel>
          <FormControl>
            <Input type="date" {...field}  />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="end_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("End Date")}</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
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
          <FormLabel>{t("Baseline Value")}</FormLabel>
          <FormControl>
            <Input
              placeholder="Baseline Value"
              {...field}
            />
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
          <FormLabel>{t("Current Value")}</FormLabel>
          <FormControl>
            <Input
              placeholder="Current Value"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="owner"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Owner")}</FormLabel>
          <FormControl>
            <Input placeholder="Owner" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Input
              type="hidden"
              defaultValue="FALSE"
              {...field}
              required
            />
            <Input defaultValue="In Progress" readOnly />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}
    <div className="w-full">
      <Label htmlFor="status">{t("Status")}</Label>
      <Input type="hidden" name="status" defaultValue="FALSE"/>
      <Input defaultValue="In Progress" readOnly />
    </div>

    <FormField
      control={form.control}
      name="key_actions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Key Actions")}</FormLabel>
          <FormControl>
            <Input placeholder="Key Actions" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="frequency_of_measurement"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Frequency of Measurement")}</FormLabel>
          <FormControl>
            <Input placeholder="Frequency of Measurement" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="completion_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Completion Date")}</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="risks"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("Risks")}</FormLabel>
          <FormControl>
            <Input placeholder="Risks" {...field} />
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
          <FormLabel>{t("Comments")}</FormLabel>
          <FormControl>
            <Input placeholder="Comments" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="visualization"
      render={({ field }) => (
    <FormItem>
    <FormLabel>{t("Visualization")}</FormLabel>
    <FormControl>
    <Select
      onValueChange={(value) => {
        field.onChange(value); 
      }}
      value={field.value} 
    >
    <SelectTrigger>
    <SelectValue placeholder="Select Chart">
      {field.value || "Select Chart"}
    </SelectValue>
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="Bar Graph">{t("Bar Graph")}</SelectItem>
    <SelectItem value="Line Graph">{t("Line Graph")}</SelectItem>
    <SelectItem value="Pie Graph">{t("Pie Graph")}</SelectItem>
    <SelectItem value="Donut Graph">{t("Donut Graph")}</SelectItem>
    </SelectContent>
    </Select>
    </FormControl>
    <FormMessage />
    </FormItem>
      )}
    />
        <div className="flex mt-5">
          <div className="flex-auto">
              <Button className="w-full" type="submit">
                {t("Create Goal")}
              </Button>
          </div>
        </div>
      </div>
    </form>
    </Form>
  );
}
