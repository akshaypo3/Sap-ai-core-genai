"use client";

import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
// import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import { format, toZonedTime } from "date-fns-tz";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const labelStyle = "original";
// const timezones = {
//   ...allTimezones,
// };

export default function Timezone({
  initialTimezone,
  onTimezoneChange,
}: {
  initialTimezone: any;
  onTimezoneChange: any;
}) {
  const [selectedTimezone, setSelectedTimezone] = useState<any>(null);
  const [convertedDate, setConvertedDate] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [tempTimezone, setTempTimezone] = useState<any | null>(null);
  const [previousTimezone, setPreviousTimezone] = useState<any>(null);

  useEffect(() => {
    const storedTimezone = JSON.parse(
      localStorage.getItem("selectedTimezone") || "null",
    );
    const storedDate = localStorage.getItem("convertedDate") || "";
    const storedPreviousTimezone = JSON.parse(
      localStorage.getItem("previousTimezone") || "null",
    );

    setSelectedTimezone(
      storedTimezone ||
        initialTimezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    setConvertedDate(storedDate);
    setPreviousTimezone(storedPreviousTimezone);

    if (onTimezoneChange) {
      onTimezoneChange(storedTimezone || initialTimezone);
    }
  }, [initialTimezone, onTimezoneChange]);

  useEffect(() => {
    if (selectedTimezone) {
      const now = new Date();
      const zonedDate = toZonedTime(
        now,
        selectedTimezone.value || selectedTimezone,
      );
      const formattedDate = format(zonedDate, "dd.MM.yyyy HH:mm:ss", {
        timeZone: selectedTimezone.value || selectedTimezone,
      });
      setConvertedDate(formattedDate);

      localStorage.setItem(
        "selectedTimezone",
        JSON.stringify(selectedTimezone),
      );
      localStorage.setItem("convertedDate", formattedDate);
    }
  }, [selectedTimezone]);

  const handleTimezoneChange = (timezone: any) => {
    setTempTimezone(timezone);
    setShowDialog(true);
  };

  const confirmTimezoneChange = () => {
    setPreviousTimezone(selectedTimezone);
    setSelectedTimezone(tempTimezone);
    setShowDialog(false);

    localStorage.setItem("previousTimezone", JSON.stringify(selectedTimezone));
  };

  // const { options, parseTimezone } = useTimezoneSelect({
  //   labelStyle,
  //   timezones,
  // });

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Timezone</h2>
        <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-3">
          <form className="space-y-4 mb-3">
            <div className="w-full">
              <Label htmlFor="timezone">Select Timezone</Label>
              <TimezoneSelect
              value={tempTimezone || selectedTimezone}
              onChange={handleTimezoneChange}
            />
              {/* <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select timezone"
                    onChange={handleTimezoneChange}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem value={tempTimezone || selectedTimezone}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
          </form>

          {convertedDate && (
            <div>
              <p className="text-md font-semibold">Changed Date:</p>
              <p className="text-sm">{convertedDate}</p>
            </div>
          )}

          {previousTimezone && (
            <div className="mt-2">
              <p className="text-md font-semibold">Timezones:</p>
              <p className="text-sm">
                Previous Timezone: {previousTimezone?.label || previousTimezone}
              </p>
              <p className="text-sm">New Timezone: {selectedTimezone?.label || selectedTimezone}</p>
            </div>
          )}
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Confirm Timezone Change
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-1 py-1">
              <div className="grid grid-cols-1 items-center gap-4">
                <label
                  htmlFor="confirm-timezone"
                  className="text-center overflow-hidden max-h-35"
                >
                  Are you sure you want to change the timezone to:{" "}
                  <b className="text-lg font-semibold text-blue-600">
                    {tempTimezone?.label || tempTimezone}{" "}
                    <span className="text-black">?</span>
                  </b>
                </label>
              </div>
            </div>
            <DialogFooter className="flex justify-between mt-4">
              <div className="flex justify-end space-x-2 mt-4">
                <DialogClose asChild>
                  <Button type="button" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" onClick={confirmTimezoneChange}>
                  Confirm Change
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}