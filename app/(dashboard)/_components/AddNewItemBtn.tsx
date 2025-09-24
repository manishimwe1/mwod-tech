'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProformaInvoiceForm } from "./PoformaForm";
import { FactureInvoiceForm } from "./FactureInvoiceForm";

const AddNewItemBtn = ({ title }: { title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {
          title === 'Add Facture'&&(
            
            <FactureInvoiceForm onClose={setIsOpen} />
          )
        }
        {
          title === 'Add Poforma'&&(

            <ProformaInvoiceForm onClose={setIsOpen} />
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default AddNewItemBtn;
