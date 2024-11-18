import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; 
  templateName?: string;
}

const DeleteEmailTemplateModal: React.FC<DeleteEmailTemplateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  templateName,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
      onClose(); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg shadow-lg p-6 w-96 bg-white dark:bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete {templateName ? `"${templateName}"` : "this template"}?</p>
        <div className="flex justify-end mt-4 space-x-1">
          <Button className="bg-green-500 hover:bg-green-600" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEmailTemplateModal;
