import React from "react";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal, ConfirmationModalContent } from "@/components/ui/confirmation-modal";
import { useTranslation } from "@/hooks/use-translation";
import { usePaymentModalState } from "@/hooks/use-payment-modal-state";

/**
 * PaymentConfirmationModals handles the display of success messages for payment-related actions.
 * It manages two distinct modals: one for when a payment method is successfully added,
 * and another for when a payment itself is successful.
 */
export const PaymentConfirmationModals: React.FC = () => {
  const { t } = useTranslation(["base"]);
  const [modalType, setModalType] = usePaymentModalState();

  const isPaymentMethodAddedOpen = modalType === "payment-method-added";
  const handlePaymentMethodAddedOpenChange = (open: boolean) => {
    setModalType(open ? "payment-method-added" : "");
  };

  const isPaymentSuccessOpen = modalType === "payment-success";
  const handlePaymentSuccessOpenChange = (open: boolean) => {
    setModalType(open ? "payment-success" : "");
  };

  const handleClose = () => setModalType("");

  return (
    <>
      <ConfirmationModal
        open={isPaymentMethodAddedOpen}
        onOpenChange={handlePaymentMethodAddedOpenChange}
      >
        <ConfirmationModalContent
          icon={<CheckCircleIcon />}
          title={t("messages.payment-method-added.title")}
          description={t("messages.payment-method-added.description")}
        >
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={handleClose}
          >
            {t("common.close")}
          </Button>
        </ConfirmationModalContent>
      </ConfirmationModal>

      <ConfirmationModal
        open={isPaymentSuccessOpen}
        onOpenChange={handlePaymentSuccessOpenChange}
      >
        <ConfirmationModalContent
          icon={<CheckCircleIcon />}
          title={t("messages.payment-success.title")}
          description={t("messages.payment-success.description")}
        >
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={handleClose}
          >
            {t("common.close")}
          </Button>
        </ConfirmationModalContent>
      </ConfirmationModal>
    </>
  );
};
