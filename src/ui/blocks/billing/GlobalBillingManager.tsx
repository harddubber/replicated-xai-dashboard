import React, { useEffect } from "react";
import { BillingDialogManager } from "@/ui/blocks/billing/BillingDialogManager";
import { PaymentConfirmationModals } from "@/ui/blocks/billing/PaymentConfirmationModals";

// Mocking external hooks based on the minified code patterns
// (0, a.useLogger)()
const useLogger = () => ({
  info: (event: string, data: Record<string, any>) => {
    console.info(event, data);
  },
});

// eb()
const useSomethingState = (): [boolean] => [true];

// (0, r.useQueryState)
const useQueryState = (
  key: string,
  options: { defaultValue: string; clearOnDefault: boolean }
): [string, (val: string) => void] => {
  return ["", (val: string) => {}];
};

/**
 * GlobalBillingManager serves as a top-level orchestrator for billing-related UI.
 * It handles the side effects of completing payment sessions (like purchasing credits
 * or adding payment methods) by tracking session IDs in the URL query parameters.
 * When a session ID is present, it logs the completion event and clears the parameter.
 * It also renders the core billing dialog management components.
 */
export const GlobalBillingManager: React.FC = () => {
  const logger = useLogger();
  const [someFlag] = useSomethingState();

  const [purchaseSessionId, setPurchaseSessionId] = useQueryState(
    "purchase-credits-session-id",
    { defaultValue: "", clearOnDefault: true }
  );

  const [paymentMethodSessionId, setPaymentMethodSessionId] = useQueryState(
    "add-payment-method-session-id",
    { defaultValue: "", clearOnDefault: true }
  );

  useEffect(() => {
    if (purchaseSessionId) {
      setPurchaseSessionId("");
      logger.info("purchase-credits-completed", {
        sessionId: purchaseSessionId,
        method: "guest",
      });
    }
  }, [someFlag, purchaseSessionId, setPurchaseSessionId, logger]);

  useEffect(() => {
    if (paymentMethodSessionId) {
      setPaymentMethodSessionId("");
      logger.info("add-payment-method-completed", {
        sessionId: paymentMethodSessionId,
      });
    }
  }, [someFlag, paymentMethodSessionId, setPaymentMethodSessionId, logger]);

  return (
    <>
      <BillingDialogManager />
      <PaymentConfirmationModals />
    </>
  );
};
