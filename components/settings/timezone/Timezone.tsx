"use client";

import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { format, toZonedTime } from 'date-fns-tz';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Timezone({
  initialTimezone,
  onTimezoneChange,
}: {
  initialTimezone: any;
  onTimezoneChange: any;
}) {
  const [selectedTimezone, setSelectedTimezone] = useState(
    initialTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);
  const [tempTimezone, setTempTimezone] = useState(selectedTimezone); 

  useEffect(() => {
    if (onTimezoneChange) {
      onTimezoneChange(selectedTimezone);
    }

    if (selectedTimezone?.value) {
      const now = new Date();
      const zonedDate = toZonedTime(now, selectedTimezone.value);
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: selectedTimezone.value });
      setConvertedDate(formattedDate);
    }
  }, [selectedTimezone, onTimezoneChange]);

  const handleTimezoneChange = (timezone: any) => {
    setTempTimezone(timezone);
    setShowDialog(true);
  };

  const confirmTimezoneChange = () => {
    setSelectedTimezone(tempTimezone);
    setShowDialog(false); 
  };
const t = useTranslations("settings-com")
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("Select Timezone")}</h1>
      <form className="space-y-4">
        <div className="w-full">
          <label htmlFor="timezone">{t("Timezone")}</label>
          <TimezoneSelect
            value={tempTimezone}
            onChange={handleTimezoneChange} 
          />
        </div>
      </form>
      {convertedDate && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{t("Converted Date:")}</h2>
          <p>{convertedDate}</p>
        </div>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">{t("Confirm Timezone Change")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-1 py-1">
            <div className="grid grid-cols-1 items-center gap-4">
              <label
                htmlFor="confirm-timezone"
                className="text-center overflow-hidden max-h-35"
              >
                {t("Are you sure you want to change the timezone to:")}
                <b className="font-bold text-lg font-semibold text-blue-600">
                  {tempTimezone?.label} <span className="text-black">?</span>
                </b>
              </label>
            </div>
          </div>
          <DialogFooter className="flex justify-between mt-4">
            <div className="flex justify-end space-x-2 mt-4">
              <DialogClose asChild>
                <Button type="button" onClick={() => setShowDialog(false)}>
                  {t("Cancel")}
                </Button>
              </DialogClose>
              <Button type="button" onClick={confirmTimezoneChange}>
                {t("Confirm Change")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
