"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { updateGoogleMapsApi } from "@/lib/settings/administration/action";

export default function GoogleMapsApi({ data }: { data: any }) {
  const [showDialog, setShowDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(data[0].key);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const confirmApiKeyUpdate = () => {
    setShowDialog(false);
    (document.getElementById("api-form") as HTMLFormElement)?.requestSubmit();
  };

  const formatApiKey = (key: string) => {
    if (key && key.length > 3) {
      return key.slice(0, 3) + "x".repeat(key.length - 3);
    }
    return key;
  };

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
      <div className="container mx-auto p-4">
        <h3 className="text-xl font-bold mb-3">Google Maps API</h3>
        <form id="api-form" action={updateGoogleMapsApi}>
          <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mt-3">
            <Label htmlFor="language">API Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                name="API_Key"
                // defaultValue={data[0].key}
                defaultValue={formatApiKey(tempApiKey)}
                onChange={(e) => setTempApiKey(e.target.value)}
                required
              />
              <Button
                className="bg-green-600"
                type="button"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </div>
            <Input type="hidden" value={data[0].id} name="apiId" />
          </div>
        </form>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Confirm API Key Update
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-1 py-1">
              <p className="text-center">
                Are you sure you want to update the API Key?
              </p>
            </div>
            <DialogFooter className="flex justify-between mt-4">
              <div className="flex justify-end space-x-2 mt-4">
                <DialogClose asChild>
                  <Button type="button" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  className="bg-green-600"
                  onClick={confirmApiKeyUpdate}
                >
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
