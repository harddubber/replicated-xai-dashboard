import React from "react";
import { cn } from "@/lib/utils";
import { Card as BaseCard } from "@/ui/components/Card2";
import { Card as StyledCard } from "@/ui/components/Card1";
import { CardContent } from "@/ui/components/CardContent";
import { Typography } from "@/ui/primitives/Typography";
import { TeamLink } from "@/ui/components/TeamLink";
import { KeyIcon } from "@/ui/icons/KeyIcon";
import { GrokLogoIcon } from "@/ui/icons/GrokLogoIcon";
import { GroupIcon } from "@/ui/icons/GroupIcon";
import { CreditCardIcon } from "@/ui/icons/CreditCardIcon";
import { ChartIcon } from "@/ui/icons/ChartIcon";
import { CubeIcon } from "@/ui/icons/CubeIcon";
import { ArrowRightIcon } from "@/ui/icons/ArrowRightIcon";

/** A translation hook that provides localized strings for the quick actions. */
const useTranslation = (namespaces: string | string[], context: string) => {
  return {
    t: (key: string) => {
      const translations: Record<string, string> = {
        "api-keys.title-existing": "Manage API keys",
        "api-keys.title-missing": "Create an API key",
        "api-keys.description": "Start integrating with our API",
        "grok-teams.title": "Manage Grok Business",
        "grok-teams.description": "Manage users and licenses",
        "invite.title": "Invite your team",
        "invite.description": "Collaborate with your team",
        "invoices.title": "View invoices",
        "invoices.description": "Track your spending",
        "billing.title": "Billing",
        "billing.description": "Manage your billing info",
        "usage.title": "Track your usage",
        "usage.description": "Deep dive into your usage",
        "models.title": "View models",
        "models.description": "Compare models and costs",
        "docs.title": "Documentation",
        "docs.description": "Read the docs",
        "users.title": "Users",
        "users.description": "Manage team members",
      };
      return translations[key] || key;
    },
  };
};

/** A custom hook to retrieve global constants like documentation URLs. */
const useConstants = () => ({ docsUrl: "/docs" });

/** A custom hook to retrieve the current team's information. */
const useTeam = () => ({ teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e", organizationId: "org-1" });

/** A custom hook to retrieve the current organization's information. */
const useOrganization = () => ({ organizationId: "org-1" });

/** A custom hook to check if the current user is in a default organization context. */
const useIsDefaultOrg = () => true;

/** A custom hook to check for a specific permission. */
const usePermission = (perm: string[]) => true;

/** A custom hook to check for multiple permissions at once. */
const usePermissions = (perms: Record<string, string[]>) => ({
  canViewApiKeys: true,
  canManageTeam: true,
  canViewBilling: true,
  canManageBilling: true,
});

/** A custom hook to retrieve the current transport for API calls. */
const useTransport = () => ({});

/** A generic hook to execute a data query. */
const useQuery = (query: any) => ({ data: true, isPending: false });

/** Query factory for fetching billing information. */
const billingInfoByTeamIdQuery = (id: string, options: any) => ({ queryKey: ["billing", id] });

/** Query factory for fetching API keys. */
const apiKeysByTeamId = (id: string, options: any) => ({ queryKey: ["api-keys", id] });

interface QuickActionItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  show?: boolean;
  target?: string;
}

export interface QuickActionsProps {
  className?: string;
}

/**
 * QuickActions component displays a grid of cards providing shortcuts to common tasks.
 * It dynamically adjusts titles, descriptions, and visibility based on user permissions
 * and the current team's status (e.g., billing info, existing API keys).
 */
export function QuickActions({ className }: QuickActionsProps) {
  const { t } = useTranslation(["home"], "quick-actions");
  const { docsUrl } = useConstants();
  const { teamId, organizationId } = useTeam();
  const org = useOrganization();
  const isDefaultOrg = useIsDefaultOrg();
  const isSameOrg = isDefaultOrg && organizationId === org?.organizationId;

  const hasBillingWrite = usePermission(["user-team:billing:read-write"]);

  const permissions = usePermissions({
    canViewApiKeys: ["user-team:api-key:read", "user-team:api-key:read-write"],
    canManageTeam: ["user-team:team-management:read-write"],
    canViewBilling: ["user-team:billing:read", "user-team:billing:read-write"],
    canManageBilling: ["user-team:billing:read-write"],
  });

  const transport = useTransport();
  const billingQuery = billingInfoByTeamIdQuery(teamId, { transport });
  const { data: billingData, isPending: billingPending } = useQuery(billingQuery);

  const apiKeysQuery = apiKeysByTeamId(teamId, { transport });
  const { data: apiKeysData, isPending: apiKeysPending } = useQuery(apiKeysQuery);

  const actions: QuickActionItem[] = [
    {
      title: t(apiKeysPending || apiKeysData ? "api-keys.title-missing" : "api-keys.title-existing"),
      description: t("api-keys.description"),
      icon: KeyIcon,
      href: "/api-keys/create",
      show: permissions.canViewApiKeys,
    },
    {
      title: t("grok-teams.title"),
      description: t("grok-teams.description"),
      icon: GrokLogoIcon,
      href: "/grok-business",
      show: hasBillingWrite,
    },
    {
      title: t("invite.title"),
      description: t("invite.description"),
      icon: GroupIcon,
      href: "/users?action=add-user",
      show: permissions.canManageTeam && !isSameOrg,
    },
    {
      title: t(billingPending || billingData ? "invoices.title" : "billing.title"),
      description: t(billingPending || billingData ? "invoices.description" : "billing.description"),
      icon: CreditCardIcon,
      href: billingPending || billingData ? "/billing/invoices" : "/billing",
      show: permissions.canManageBilling,
    },
    {
      title: t("usage.title"),
      description: t("usage.description"),
      icon: ChartIcon,
      href: "/usage",
      show: permissions.canViewBilling,
    },
    {
      title: t("models.title"),
      description: t("models.description"),
      icon: CubeIcon,
      href: "/models",
    },
    {
      title: t("docs.title"),
      description: t("docs.description"),
      icon: GrokLogoIcon, // Using placeholder icon
      href: docsUrl,
      target: "_blank",
    },
    {
      title: t("users.title"),
      description: t("users.description"),
      icon: GroupIcon,
      href: "/users",
      show: permissions.canManageTeam,
    },
  ];

  const visibleActions = actions.filter((action) => action.show !== false).slice(0, 6);

  return (
    <div className={cn("w-full rounded-2xl border bg-surface p-3 dark:border-none relative overflow-hidden", className)}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {visibleActions.map((action, index) => (
          <StyledCard
            key={index}
            elevation={undefined}
            className="overflow-clip rounded-xl border transition-all border-muted dark:border-muted/50 bg-surface-l1 dark:shadow-none hover:ring-primary has-[:focus-visible]:ring-primary dark:hover:ring-primary/25 dark:has-[:focus-visible]:ring-primary/25 group relative h-full bg-gradient-to-tl shadow-sm ring-1 ring-transparent duration-150 hover:from-surface-l4 hover:to-surface-l1 hover:shadow-md has-[:focus-visible]:from-surface-l4 has-[:focus-visible]:to-surface-l1 has-[:focus-visible]:shadow-md"
          >
            <div className="p-6 flex h-full flex-col">
              <action.icon size={32} />
              <div className="mt-6 flex flex-grow items-end justify-between gap-3">
                <div>
                  <Typography variant="heading4" color="regular">
                    <TeamLink
                      href={action.href}
                      target={action.target || "_self"}
                      className="absolute inset-0 outline-none"
                    />
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="muted" className="mt-1">
                    {action.description}
                  </Typography>
                </div>
                <div>
                  <ArrowRightIcon size={20} className="origin-right -rotate-45" />
                </div>
              </div>
            </div>
          </StyledCard>
        ))}
      </div>
    </div>
  );
}
