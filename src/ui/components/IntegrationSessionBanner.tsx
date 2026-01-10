import React from "react";
import { cn } from "@/lib/utils";

// Mocking the imported hooks and components based on the minified code structure
// These would typically be imported from the project's library
interface UseTeamResult {
  teamId: string;
}

interface IntegrationSession {
  isIntegration: boolean;
}

interface UseSessionResult {
  integrationSession?: IntegrationSession;
}

interface Router {
  replace: (path: string) => void;
}

interface TeamAndRoleQuery {
  teamId: string;
  [key: string]: any;
}

// These are placeholders for the actual hook implementations
// In a real scenario, these would be imported from their respective modules
declare const useTeam: () => UseTeamResult;
declare const useSession: () => UseSessionResult;
declare const useRouter: () => Router;
declare const useQuery: (query: any) => { data: any };
declare const useTranslation: (namespace: string | string[], options: { keyPrefix: string }) => { t: (key: string) => string };
declare const teamAndRoleQuery: (teamId: string) => TeamAndRoleQuery;

// Mock components
const Text = ({ variant, className, children }: { variant?: string; className?: string; children: React.ReactNode }) => (
  <span className={cn(variant, className)}>{children}</span>
);

const Button = ({ variant, size, onClick, children }: { variant?: string; size?: string; onClick?: () => void; children: React.ReactNode }) => (
  <button className={cn(variant, size)} onClick={onClick}>{children}</button>
);

export interface IntegrationSessionBannerProps {}

/**
 * A banner that appears when an integration session is active.
 * It provides information to the user and an action to close the session.
 */
export const IntegrationSessionBanner: React.FC<IntegrationSessionBannerProps> = () => {
  const { t } = useTranslation("base", { keyPrefix: "components.integration-session-banner" });
  const { teamId } = useTeam();
  const { integrationSession } = useSession();
  const router = useRouter();

  const isIntegration = integrationSession?.isIntegration;

  const queryParams = React.useMemo(() => {
    const baseQuery = teamAndRoleQuery(teamId);
    return {
      ...baseQuery,
      // The minified code used a variable 'u' which isn't defined in the snippet.
      // Usually, this refers to a selector or a specific query option.
      select: (data: any) => data, 
    };
  }, [teamId]);

  const { data: teamData } = useQuery(queryParams);

  const handleCloseSession = React.useCallback(() => {
    router.replace("/close-integration-session");
  }, [router]);

  // If there's no team data or it's not an integration session, don't render anything.
  if (!teamData || !isIntegration) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 bg-surface-l1 p-3">
      <Text variant="body5" className="text-warning-foreground text-center">
        {t("text")}
      </Text>
      <Button variant="outline" size="xs" onClick={handleCloseSession}>
        {t("actions.close")}
      </Button>
    </div>
  );
};
