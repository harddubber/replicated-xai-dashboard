import React from "react";
import { cn } from "@/lib/utils";
import { TeamUsageSummaryCard } from "@/ui/blocks/billing/TeamUsageSummaryCard";
import { Card } from "@/ui/components/Card2";
import { Typography } from "@/ui/primitives/Typography";
import { Button } from "@/ui/components/Button";
import { DomainStatusBanner } from "@/ui/components/DomainStatusBanner";

// Assuming these are the hooks and components used based on the minified code
// and common patterns in the provided dependencies.

// Stubbing hooks that aren't explicitly provided but used in minified code
const useTeam = () => ({ teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e" });
const useTranslation = (namespace: string[]) => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      "billing-summary.free-credits.title": "Free Credits Available",
      "billing-summary.free-credits.description": "You have free credits available to use on your account.",
      "billing-summary.free-credits.cta": "Claim Credits",
      "billing-summary.no-billing-info.title": "No Billing Information",
      "billing-summary.no-billing-info.description": "Please add billing information to continue using our services.",
      "billing-summary.no-billing-info.cta": "Add Billing Info",
    };
    return translations[key] || key;
  },
});
const useRouter = () => ({ push: (url: string) => {} });
const useTransport = () => ({});
const useQuery = (query: any) => ({ data: query?.data || null });

// Mock queries
const billingInfoByTeamIdQuery = (teamId: string, options: any) => ({ teamId, options, data: {} });
const getDomainStatusQuery = (options: any) => ({
  options,
  data: {
    status: DomainStatus.None,
    teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e",
  },
});

const DomainStatus = {
  None: 0, // Inferred from H.GetDomainStatusResp_DomainStatus.None
};

export interface BillingSummaryCardProps {
  enableNewFreeCreditsFlow?: boolean;
  isLocked?: boolean;
}

/**
 * A billing summary component that integrates TeamUsageSummaryCard with
 * free credit flow logic and domain status checks.
 */
export function BillingSummaryCard({
  enableNewFreeCreditsFlow = false,
  isLocked = false,
}: BillingSummaryCardProps) {
  const { teamId } = useTeam();
  const { t } = useTranslation(["home"]);
  const router = useRouter();
  const transport = useTransport();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // In the minified code, these queries are memoized using the cache sentinel pattern
  const billingQuery = React.useMemo(
    () => billingInfoByTeamIdQuery(teamId, { transport }),
    [teamId, transport]
  );
  const { data: billingData } = useQuery({ ...billingQuery, select: (data: any) => data });

  const domainStatusQuery = React.useMemo(
    () => getDomainStatusQuery({ transport }),
    [transport]
  );
  const { data: domainStatusData } = useQuery(domainStatusQuery);

  let topContent: React.ReactNode = null;

  if (enableNewFreeCreditsFlow) {
    if (domainStatusData?.status === DomainStatus.None) {
      topContent = (
        <Card>
          <div className="flex flex-wrap items-center gap-4 px-4 py-3 md:flex-nowrap">
            <div className="flex-grow">
              <Typography variant="label">
                {t("billing-summary.free-credits.title")}
              </Typography>
              <Typography variant="body5" color="subtle" className="max-w-lg">
                {t("billing-summary.free-credits.description")}
              </Typography>
            </div>
            <div className="w-full flex-shrink-0 md:w-fit">
              <Button
                size="lg"
                variant="accent"
                className="w-full"
                onClick={() => setIsModalOpen(true)}
              >
                {t("billing-summary.free-credits.cta")}
              </Button>
            </div>
          </div>
        </Card>
      );
    } else if (!billingData && domainStatusData?.teamId === teamId) {
      topContent = (
        <Card>
          <div className="flex flex-wrap items-center gap-4 px-4 py-3 md:flex-nowrap">
            <div className="flex-grow">
              <Typography variant="label">
                {t("billing-summary.no-billing-info.title")}
              </Typography>
              <Typography variant="body5" color="subtle" className="max-w-lg">
                {t("billing-summary.no-billing-info.description")}
              </Typography>
            </div>
            <div className="w-full flex-shrink-0 md:w-fit">
              <Button
                size="lg"
                variant="accent"
                className="w-full"
                onClick={() => router.push("/billing")}
              >
                {t("billing-summary.no-billing-info.cta")}
              </Button>
            </div>
          </div>
        </Card>
      );
    }
  }

  const bottomContent = enableNewFreeCreditsFlow ? <DomainStatusBanner /> : null;

  return (
    <>
      <TeamUsageSummaryCard
        topContent={topContent}
        bottomContent={bottomContent}
        isLocked={isLocked}
      />
      {enableNewFreeCreditsFlow && (
        <FreeCreditsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
}

// Rename component export for internal use and tool requirement
export const ComponentToRewrite = BillingSummaryCard;

function FreeCreditsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (val: boolean) => void }) {
  return null; 
}
