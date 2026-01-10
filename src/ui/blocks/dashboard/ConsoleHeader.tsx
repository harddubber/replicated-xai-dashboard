import React from "react";
import { DashboardHeader } from "@/ui/blocks/dashboard/DashboardHeader";
import { InternalTeamBadge } from "@/ui/components/InternalTeamBadge";
import { DevModeToggle } from "@/ui/components/DevModeToggle";
import { type User, type Organization, type OrganizationRbacRole } from "@/ui/components/UserHeaderWidget";

// Mocking usePathname or similar since it's used in the minified code (a.default)
// The minified code uses (0, a.default)() and destructures { relativePath: g }.
// We'll assume a hook that returns the current path.
const usePathname = () => {
  // In a real app this would come from next/navigation or react-router
  // For the sake of this component and matching the logic:
  return { relativePath: "/" }; 
};

export interface ConsoleHeaderProps {
  user: User | null;
  currentTeamId?: string;
  accountUrl?: string;
  docsUrl?: string;
  websiteUrl?: string;
  organization?: Organization | null;
  organizationRbacRole?: OrganizationRbacRole | null;
}

/**
 * ConsoleHeader is a specialized version of DashboardHeader that includes
 * internal team badges, developer mode toggles, and dynamic documentation links
 * based on the current relative path.
 */
export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  user,
  currentTeamId,
  accountUrl,
  docsUrl = "https://docs.x.ai",
  websiteUrl,
  organization,
  organizationRbacRole,
}) => {
  const { relativePath } = usePathname();

  // Dynamic documentation URL mapping based on the current path
  const getDynamicDocsUrl = (baseDocsUrl: string, path: string) => {
    const mapping: Record<string, string> = {
      "/": baseDocsUrl,
      "/billing": `${baseDocsUrl}/docs/key-information/billing`,
      "/billing/credits": `${baseDocsUrl}/docs/key-information/billing`,
      "/billing/invoices": `${baseDocsUrl}/docs/key-information/billing`,
      "/billing/payment": `${baseDocsUrl}/docs/key-information/billing`,
      "/collections": `${baseDocsUrl}/docs/key-information/collections`,
      "/files": `${baseDocsUrl}/docs/guides/files`,
      "/models": `${baseDocsUrl}/docs/models`,
      "/settings/domains": `${baseDocsUrl}/docs/resources/faq-api/team-management`,
      "/settings/security": `${baseDocsUrl}/docs/resources/faq-api/accounts`,
      "/settings/team": `${baseDocsUrl}/docs/resources/faq-api/team-management`,
      "/tokenizer": `${baseDocsUrl}/docs/key-information/consumption-and-rate-limits#text-tokens`,
      "/usage": `${baseDocsUrl}/docs/key-information/usage-explorer`,
      "/users": `${baseDocsUrl}/docs/resources/faq-api/team-management`,
    };
    return mapping[path] ?? baseDocsUrl;
  };

  const dynamicDocsUrl = getDynamicDocsUrl(docsUrl, relativePath);

  // The minified code constructs 'n' (menuItems)
  const menuItems = (
    <div className="flex h-full items-center">
      <div className="flex items-center gap-2 pl-3 pr-2">
        <InternalTeamBadge />
        <DevModeToggle />
      </div>
    </div>
  );

  return (
    <DashboardHeader
      user={user}
      currentTeamId={currentTeamId}
      accountUrl={accountUrl}
      docsUrl={dynamicDocsUrl}
      websiteUrl={websiteUrl}
      organization={organization}
      organizationRbacRole={organizationRbacRole}
      menuItems={menuItems}
    />
  );
};
