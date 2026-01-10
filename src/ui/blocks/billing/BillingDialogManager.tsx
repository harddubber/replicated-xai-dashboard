import React from "react";

// Assuming these are the components based on the minified code logic
// The minified code uses h.default, eo, u.default, c.default, d.default, eg.
// I will define them as internal placeholders or assume they are passed/imported if I had more info.
// However, since I must provide a working component, I'll create a registry or assume standard naming.

// Mocking the hook 'ev' which seems to be a state manager for query params or a global state.
// In a real scenario, this might come from a library like 'useQueryState' or similar.
const useDialogState = (): [string, (val: string) => void] => {
  const [state, setState] = React.useState("");
  return [state, setState];
};

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// These would typically be imported from other files.
// Since they are not in the dependencies list, I will define them as components that take DialogProps.
const PurchaseCreditsDialog: React.FC<DialogProps> = () => null;
const PurchaseLicensesDialog: React.FC<DialogProps> = () => null;
const CancelLicensesDialog: React.FC<DialogProps> = () => null;
const AddPaymentMethodDialog: React.FC<DialogProps> = () => null;
const EditBillingInfoDialog: React.FC<DialogProps> = () => null;
const RedeemCreditsDialog: React.FC<DialogProps> = () => null;

/**
 * A manager component that handles the visibility state of various billing and license related dialogs.
 * It tracks which dialog is currently active based on a state (likely synced with URL or global state).
 */
export const BillingDialogManager: React.FC = () => {
  const [activeDialog, setActiveDialog] = useDialogState();

  const createOnOpenChange = (key: string) => (open: boolean) => {
    setActiveDialog(open ? key : "");
  };

  return (
    <>
      <PurchaseCreditsDialog
        open={activeDialog === "purchase-credits"}
        onOpenChange={createOnOpenChange("purchase-credits")}
      />
      <PurchaseLicensesDialog
        open={activeDialog === "purchase-licenses"}
        onOpenChange={createOnOpenChange("purchase-licenses")}
      />
      <CancelLicensesDialog
        open={activeDialog === "cancel-licenses"}
        onOpenChange={createOnOpenChange("cancel-licenses")}
      />
      <AddPaymentMethodDialog
        open={activeDialog === "add-payment-method"}
        onOpenChange={createOnOpenChange("add-payment-method")}
      />
      <EditBillingInfoDialog
        open={activeDialog === "edit-billing-info"}
        onOpenChange={createOnOpenChange("edit-billing-info")}
      />
      <RedeemCreditsDialog
        open={activeDialog === "redeem-credits"}
        onOpenChange={createOnOpenChange("redeem-credits")}
      />
    </>
  );
};
