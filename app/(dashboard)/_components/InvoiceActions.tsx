"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, CheckCircle, Save } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ProformaInvoiceForm } from "./PoformaForm";
import { FactureInvoiceForm } from "./FactureInvoiceForm";
import ApproveModal from "./ApproveModal";

export function InvoiceActions({
  handleExport,
  facture,
}: {
  handleExport: (facture: Doc<"facture">) => void;
  facture: Doc<"facture">;
}) {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setopenEdit] = React.useState(false);
  const [openApproveModel, setopenApproveModel] = React.useState(false)

  const deleteFacture = useMutation(api.facture.deleteInvoice);

  const handleDelete = async () => {
    try {
      await deleteFacture({
        id: facture._id,
      });
      setOpenDelete(false);
      toast.success("Facture deleted successfully", { richColors: true });
      // Refresh facture list or show success message
    } catch (error) {
      toast.error("Error deleting facture", { richColors: true });
      console.error("Error deleting facture:", error);
      // Show error message
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => handleExport(facture)}>
          <Save className="w-4 h-4 mr-2" /> Export
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setopenEdit(true)}>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-green-600" onClick={() => setopenApproveModel(true)}>
          <CheckCircle className="w-4 h-4 mr-2" /> Approve
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      {
        openApproveModel && (
          <ApproveModal 
            openApproveModel={openApproveModel}
            setOpenApproveModel={setopenApproveModel}
            facture={facture}
          />
        )
      }

      {isConfirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold">Confirm Approval</h3>
            <p>Are you sure you want to mark this facture as approved?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsConfirming(false)}>
                Cancel
              </Button>
              <Button
                // onClick={confirmApprove}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
      {openDelete && (
        <AlertDialog
          open={openDelete}
          onOpenChange={() => setOpenDelete(false)}
        >
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this facture? Once deleted, you
                won&apos;t be able to recover the facture details and all
                associated data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="cursor-pointer bg-red-400 text-white hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {openEdit && (
        <Dialog open={openEdit} onOpenChange={setopenEdit}>
          <DialogTrigger asChild>
            <Button>Add facture</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <FactureInvoiceForm onClose={setopenEdit} facture={facture} />
          </DialogContent>
        </Dialog>
      )}
    </DropdownMenu>
  );
}
