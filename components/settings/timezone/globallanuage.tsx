"use client"; // <-- Ensure this is a client-side component

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { changelanguage, Globallanguagedata } from "@/lib/settings/users/action";
import Cookies from "js-cookie";

export default function Globallanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Default is blank
  const [showDialog, setShowDialog] = useState(false);
  const [tempLanguage, setTempLanguage] = useState<string>("");

  // Function to fetch language data
  const fetchLanguageData = async () => {
    try {
      const result = await Globallanguagedata();
      const language = result?.language || ""; // If no language is found, keep it blank
      setSelectedLanguage(language);
      setTempLanguage(language); // Set temp language as well
    } catch (error) {
      console.error("Failed to fetch language data:", error);
    }
  };

  // Fetch language data on component mount
  useEffect(() => {
    fetchLanguageData();
  }, []); // Empty dependency array to run only on mount

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setTempLanguage(language);
    setShowDialog(true); // Show confirmation dialog
  };

  // Confirm the language change
  const languageChange = async () => {
    setSelectedLanguage(tempLanguage); // Set the selected language to tempLanguage
    setShowDialog(false); // Close the dialog
    await changelanguage(tempLanguage); // Call API to save the language change
    Cookies.set("locale", tempLanguage);
    window.location.reload();
  };

  // Cancel the language change and reset to the selected language
  const cancelLanguageChange = () => {
    setTempLanguage(selectedLanguage); // Reset temp language to selected language
    setShowDialog(false); // Close the dialog
  };

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-2">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">Global Language</h3>
        </div>
        <div>
          <form>
            <Label htmlFor="language">Language</Label>
            {/* Language selection dropdown */}
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                {/* Don't display a default placeholder */}
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-center">Confirm Language Change</DialogTitle>
          </DialogHeader>
          <div className="grid gap-1 py-1">
            <div className="grid grid-cols-1 items-center gap-4">
              <label htmlFor="confirm-language" className="text-center overflow-hidden max-h-35">
                Are you sure you want to change the language to:{" "}
                <b className="text-lg font-semibold text-blue-600">
                  {tempLanguage === "en" ? "English" : tempLanguage === "de" ? "Deutsch" : "Français (French)"}{" "}
                  <span className="text-black">?</span>
                </b>
              </label>
            </div>
          </div>
          <DialogFooter className="flex justify-between mt-4">
            <div className="flex justify-end space-x-2 mt-4">
              <DialogClose asChild>
                <Button type="button" onClick={cancelLanguageChange}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={languageChange}>
                Confirm Change
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
