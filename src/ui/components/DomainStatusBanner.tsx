import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

// Mocking external hooks and components based on the minified code
// In a real scenario, these would be imported from their respective modules.

interface User {
  email: string;
}

interface Team {
  teamId: string;
  name: string;
}

interface DomainStatusResponse {
  status: DomainStatus;
  teamId?: string;
}

enum DomainStatus {
  Unknown = 0,
  TeamExistingWithUser = 1,
  TeamExistingWithoutUser = 2,
  NoTeam = 3,
}

// These are placeholders for the actual hook implementations
const useTeam = (): { teamId: string; user?: User; name: string } => ({
  teamId: "",
  name: "",
});
const useTranslation = (ns: string[], key: string) => ({
  t: (k: string, options?: any) => k,
});
const useRouter = () => ({ push: (url: string) => {} });
const useRequestErrorToast = () => ({ showErrorToast: (err: any) => {} });
const useTransport = () => ({});
const useQuery = (options: any): { data?: any } => ({});
const useMutation = (options: any): { mutate: (vars: any) => void; isPending: boolean } => ({
  mutate: () => {},
  isPending: false,
});

// Mock UI Components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">{children}</div>
);
const Text = ({
  variant,
  color,
  className,
  children,
}: {
  variant?: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}) => <div className={cn(variant, color, className)}>{children}</div>;
const Button = ({
  variant,
  className,
  onClick,
  disabled,
  loading,
  children,
}: {
  variant?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) => (
  <button className={className} onClick={onClick} disabled={disabled || loading}>
    {children}
  </button>
);
const Trans = ({
  t,
  i18nKey,
  values,
  components,
  children,
}: {
  t: any;
  i18nKey: string;
  values?: any;
  components?: any;
  children?: React.ReactNode;
}) => <span>{i18nKey}</span>;

const InfoCircledIcon = ({ size }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    [[SVG:0|PATH:0|NAME:InfoCircledIcon|DESCRIPTION:An information icon inside a circle]]
  </svg>
);

// Query/Mutation placeholders
const getDomainStatusQuery = (params: any) => ({});
const listTeamsQuery = (params: any) => ({});
const domainJoinableTeamsQueryOptions = (params: any) => ({});
const joinDomainTeamMutation = (params: any) => ({});

export interface DomainStatusBannerProps {
  // Props are likely internal hooks, but we define the interface for completeness
}

export function DomainStatusBanner() {
  const { teamId: currentTeamId, user, name: currentTeamName } = useTeam();
  const domain = user?.email.split("@")[1];
  const { t } = useTranslation(["home"], "domain-status");
  const router = useRouter();
  const { showErrorToast } = useRequestErrorToast();
  const transport = useTransport();

  const { data: domainStatusData } = useQuery(getDomainStatusQuery({ transport }));

  const { data: userTeams = [] } = useQuery({
    ...listTeamsQuery({ transport }),
    select: (data: { teams: Team[] }) => data.teams,
  });

  const { data: joinableTeams = [] } = useQuery({
    ...domainJoinableTeamsQueryOptions({ transport }),
    select: (data: { teams: Team[] }) => data.teams,
  });

  const { mutate: joinTeam, isPending: isJoining } = useMutation({
    ...joinDomainTeamMutation({ transport }),
    onError: showErrorToast,
    onSuccess: (_data: any, variables: { teamId: string }) => {
      router.push(`/team/${variables.teamId}`);
    },
  });

  const targetTeam = useMemo(() => {
    let team = { name: currentTeamName, teamId: currentTeamId };
    if (domainStatusData?.teamId) {
      const foundTeam =
        userTeams.find((t: Team) => t.teamId === domainStatusData.teamId) ||
        joinableTeams.find((t: Team) => t.teamId === domainStatusData.teamId);
      if (foundTeam) {
        team = foundTeam;
      }
    }
    return team;
  }, [domainStatusData?.teamId, userTeams, joinableTeams, currentTeamName, currentTeamId]);

  const showBanner =
    domainStatusData?.status &&
    [DomainStatus.TeamExistingWithUser, DomainStatus.TeamExistingWithoutUser].includes(
      domainStatusData.status,
    );

  if (!showBanner) {
    return null;
  }

  return (
    <Card>
      <div className="px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-3 md:flex-nowrap">
          <div className="flex flex-grow items-center justify-center gap-3">
            <div className="flex shrink-0 items-center">
              <InfoCircledIcon size={24} />
            </div>
            <div className="flex-grow">
              <Text variant="label">
                <Trans
                  t={t}
                  i18nKey="accepted.title"
                  values={{ domain }}
                  components={{ bold: <strong /> }}
                />
              </Text>
              <Text variant="body5" color="subtle" className="max-w-lg">
                {domainStatusData.teamId !== currentTeamId ? (
                  <Trans
                    t={t}
                    i18nKey="accepted.description"
                    values={{ team: targetTeam.name }}
                    components={{ bold: <strong /> }}
                  />
                ) : (
                  t("accepted.description-current-team")
                )}
              </Text>
            </div>
          </div>
          {domainStatusData?.teamId && (
            <>
              {domainStatusData.teamId !== currentTeamId &&
                domainStatusData.status === DomainStatus.TeamExistingWithUser && (
                  <Button
                    variant="accent"
                    className="w-full md:w-fit"
                    onClick={() => router.push(`/team/${domainStatusData.teamId}`)}
                  >
                    {t("accepted.switch-team")}
                  </Button>
                )}
              {domainStatusData.status === DomainStatus.TeamExistingWithoutUser && (
                <Button
                  variant="accent"
                  className="w-full md:w-fit"
                  disabled={isJoining}
                  loading={isJoining}
                  onClick={() => joinTeam({ teamId: domainStatusData.teamId })}
                >
                  {t("accepted.join-team")}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
