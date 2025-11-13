import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { CheckCircle } from "lucide-react";
import React from "react";

const ApproveModal = ({
  openApproveModel,
  setOpenApproveModel,
  facture,
}: {
  openApproveModel: boolean;
  setOpenApproveModel: (open: boolean) => void;
  facture: Doc<"facture">;
}) => {
  const updateFacture = useMutation(api.facture.updateFacture);
  const createLedger = useMutation(api.ledger.createLedgerIncome);
  const handleConfirmPayment = async () => {
    try {
      await Promise.all([
        updateFacture({
          id: facture._id,
          fields: {
            status: "paid",
          },
        }),
        createLedger({
          totalAmount: facture.totalAmount,
          date: facture.date,
          invoiceId: facture._id,
        }),
      ]);
      setOpenApproveModel(false);
    } catch (error) {
      console.error("Error approving facture:", error);
    }
  };
  return (
    <Dialog open={openApproveModel} onOpenChange={setOpenApproveModel}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CheckCircle className="w-4 h-4 mr-2" /> Mark as Paid
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Confirm Payment
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You are about to mark this facture as paid. This action cannot be
            undone.
          </p>
          <div className="rounded-lg border bg-gray-50 dark:bg-gray-700 p-3 space-y-1 dark:border-gray-600">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Facture #
              </span>
              <span className="font-medium">
                {facture.factureNumber || facture._id}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Amount</span>
              <span className="font-medium">{facture.totalAmount} RWF</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Client</span>
              <span className="font-medium">{facture.clientName || "—"}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpenApproveModel(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveModal;
