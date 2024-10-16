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
import { useTranslations } from "next-intl";

export default function CreateGoalForm() {
  const t = useTranslations("goals")
  return (

    <form
      action={createGoal}
      className={`p-4`}
    >

      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="name">{t("Goal Name")}</Label>
        <Input type="text" name="name" placeholder={t("Goal Name")} required />

        <Label htmlFor="description">{t("Description")}</Label>
        <Input
          type="text"
          name="description"
          placeholder={t("Description")}
          required
        />

        <Label htmlFor="target_value">{t("Target Value")}</Label>
        <Input
          type="number"
          name="target_value"
          placeholder={t("Target Value")}
          required
        />

        <Label htmlFor="unit_of_measure">{t("Unit of Measure")}</Label>
        <Input
          type="text"
          name="unit_of_measure"
          placeholder={t("Unit of Measure")}
          required
        />

        <Label htmlFor="start_date">{t("Start Date")}</Label>
        <Input
          type="date"
          name="start_date"
          placeholder={t("Start Date")}
          required
        />

        <Label htmlFor="end_date">{t("End Date")}</Label>
        <Input type="date" name="end_date" placeholder={t("End Date")} required />

        <Label htmlFor="baseline_value">{t("Baseline Value")}</Label>
        <Input
          type="number"
          name="baseline_value"
          placeholder={t("Baseline Value")}
          required
        />

        <Label htmlFor="current_value">{t("Current Value")}</Label>
        <Input
          type="number"
          name="current_value"
          placeholder={t("Current Value")}
          required
        />

        {/* <Label htmlFor="progress">Progress (%)</Label>
        <Input
          type="number"
          name="progress"
          placeholder="Progress (%)"
          required
        /> */}

        <Label htmlFor="owner">{t("Owner")}</Label>
        <Input type="text" name="owner" placeholder={t("Owner")} required />


        <div className="w-full">
          <Label htmlFor="status">{("Status")}</Label>
          <Input type="hidden" name="status" defaultValue="FALSE"/>
          <Input defaultValue="In Progress" readOnly />
        </div>

        <Label htmlFor="key_actions">{t("Key Actions")}</Label>
        <Input
          type="text"
          name="key_actions"
          placeholder={t("Key Actions")}
          required
        />

        <Label htmlFor="frequency_of_measurement">
          {t("Frequency of Measurement")}
        </Label>
        <Input
          type="text"
          name="frequency_of_measurement"
          placeholder={t("Frequency of Measurement")}
          required
        />

        <Label htmlFor="completion_date">{t("Completion Date")}</Label>
        <Input
          type="date"
          name="completion_date"
          placeholder={t("Completion Date")}
          required
        />

        <Label htmlFor="risks">{t("Risks")}</Label>
        <Input type="text" name="risks" placeholder={t("Risks")} required />

        <Label htmlFor="comments">{("Comments")}</Label>
        <Input type="text" name="comments" placeholder={t("Comments")} required />

        <div className="w-full">
          <Label htmlFor="visualization">{t("Status")}</Label>
          <Select
            name="visualization"
          >
            <SelectTrigger>
              <SelectValue
                placeholder={t("Select Chart")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bar Graph">{t("Bar Graph")}</SelectItem>
              <SelectItem value="Line Graph">{t("Line Graph")}</SelectItem>
              <SelectItem value="Pie Graph">{t("Pie Graph")}</SelectItem>
              <SelectItem value="Donut Graph">{t("Donut Graph")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                {t("Create Goal")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
