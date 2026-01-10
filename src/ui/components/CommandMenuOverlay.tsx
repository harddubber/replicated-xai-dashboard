import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CommandMenu } from "@/ui/components/CommandMenu";
import { cn } from "@/lib/utils";

// Mocking external hooks and components based on minified code
// In a real scenario, these would be imported from their respective paths.

// Placeholder for external hooks
const useCommandMenu = () => ({
  currentPage: { id: "root", searchValue: "", isSearchEnabled: true },
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
  close: () => {},
});

const useTranslation = (namespaces: string[]) => ({
  t: (key: string) => key,
});

const useParams = () => ({ teamId: "team-1" });
const useRouter = () => ({ push: (url: string) => {} });
const useQueryClient = () => ({
  invalidateQueries: (query: any) => {},
});

const usePermissions = (perms: any) => ({
  canManageApiKeys: true,
  canViewUsage: true,
});

const useRequestErrorToast = () => ({
  showErrorToast: (error: any) => {},
});

const useQuery = (query: any) => ({
  data: undefined,
  isFetching: false,
});

const useMutation = (options: any) => ({
  mutate: (vars: any, opts: any) => {},
  isPending: false,
});

// Skeleton component
const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-muted", className)} />
);

// Child components (placeholders based on minified code)
const TeamSwitcher = ({ allTeams, teamId }: any) => null;
const JoinTeamList = ({ joinableTeams, onJoin }: any) => null;
const TeamInfo = ({ teamName }: any) => null;
const RouteList = ({ teamId, accountUrl, docsUrl, hideRoutes }: any) => null;
const GenericActions = () => null;
const ThemeSwitcher = () => null;
const AssistantProvider = ({ isDisabled, setIsLoading, setHasAssistantComponent }: any) => null;

export interface CommandMenuOverlayProps {
  docsUrl?: string;
  accountUrl?: string;
}

export const CommandMenuOverlay: React.FC<CommandMenuOverlayProps> = ({
  docsUrl,
  accountUrl,
}) => {
  const {
    currentPage,
    isLoading,
    setIsLoading,
    close,
  } = useCommandMenu();

  const { t } = useTranslation(["command-menu"]);
  const { teamId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [hasAssistantComponent, setHasAssistantComponent] = useState(false);

  const { canManageApiKeys, canViewUsage } = usePermissions({
    canManageApiKeys: ["user-team:api-key:read-write"],
    canViewUsage: ["user-team:billing:read", "user-team:billing:read-write"],
  });

  const { showErrorToast } = useRequestErrorToast();

  // Mocking query/mutation objects
  const teamAndRoleQuery = (id?: string) => ({ id });
  const domainJoinableTeamsQuery = () => ({ type: "joinable" });
  const teamsQuery = { type: "all" };

  const { data: teamData, isFetching: isTeamFetching } = useQuery(teamAndRoleQuery(teamId));
  
  const { data: joinableTeams = [], isFetching: isJoinableFetching } = useQuery({
    ...domainJoinableTeamsQuery(),
    enabled: !!teamId && (currentPage.id === "join-team" || !!currentPage.searchValue),
  });

  const { data: allTeams = [], isFetching: isAllTeamsFetching } = useQuery({
    ...teamsQuery,
    enabled: !!teamId && (currentPage.id === "switch-team" || !!currentPage.searchValue),
  });

  const { mutate: joinTeam, isPending: isJoining } = useMutation({
    mutationFn: async (vars: any) => {}, // Replace with actual join function
    onError: showErrorToast,
  });

  const handleJoinTeam = useCallback(
    (id: string) => {
      joinTeam(
        { teamId: id },
        {
          onSuccess: () => {
            router.push(`/team/${id}`);
            close();
            queryClient.invalidateQueries(domainJoinableTeamsQuery());
            queryClient.invalidateQueries(teamsQuery);
          },
        }
      );
    },
    [router, close, queryClient, joinTeam]
  );

  const emptyState = useMemo(() => {
    if (isLoading || hasAssistantComponent || currentPage.id !== "root") {
      if (isLoading && !hasAssistantComponent && currentPage.isSearchEnabled) {
        return (
          <div className="w-full space-y-2">
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md delay-300" />
            <Skeleton className="h-14 w-full rounded-md delay-500" />
            <Skeleton className="h-14 w-full rounded-md delay-700" />
          </div>
        );
      }
      return null;
    }
    return t("no-results");
  }, [isLoading, hasAssistantComponent, currentPage.id, currentPage.isSearchEnabled, t]);

  useEffect(() => {
    setIsLoading(isTeamFetching || isJoinableFetching || isAllTeamsFetching || isJoining || isAssistantLoading);
    return () => {
      setIsLoading(false);
    };
  }, [isTeamFetching, isJoinableFetching, isAllTeamsFetching, isJoining, isAssistantLoading, setIsLoading]);

  const searchHints = useMemo(() => {
    let hints: string[] = [];
    if (canManageApiKeys) {
      hints = [
        ...hints,
        t("hints.create-new-key"),
        t("hints.disable-key-with-name-test"),
        t("hints.delete-old-keys"),
      ];
    } else if (canViewUsage) {
      hints = [
        ...hints,
        t("hints.month-expense"),
        t("hints.show-week-token-usage"),
      ];
    }

    const shuffled = [...hints];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [t, canManageApiKeys, canViewUsage]);

  return (
    <CommandMenu
      placeholder={t("placeholder")}
      emptyState={emptyState}
      showFooter={true}
      classNames={{
        list: ["api-key-create-form", "api-key-edit-form"].includes(currentPage.id)
          ? "!h-[360px]"
          : "",
      }}
      searchHints={searchHints}
    >
      {teamId && (
        <>
          {(currentPage.id === "switch-team" || !!currentPage.searchValue) && (
            <TeamSwitcher allTeams={allTeams} teamId={teamId} />
          )}
          {(currentPage.id === "join-team" || !!currentPage.searchValue) && (
            <JoinTeamList joinableTeams={joinableTeams} onJoin={handleJoinTeam} />
          )}
        </>
      )}

      {currentPage.id === "root" && (
        <>
          {teamId && <TeamInfo teamName={(teamData as any)?.team?.name} />}
          <RouteList
            teamId={teamId}
            accountUrl={accountUrl}
            docsUrl={docsUrl}
            hideRoutes={hasAssistantComponent}
          />
          <GenericActions />
        </>
      )}

      {currentPage.id === "theme-switcher" && <ThemeSwitcher />}

      <AssistantProvider
        isDisabled={currentPage.id !== "root"}
        setIsLoading={setIsAssistantLoading}
        setHasAssistantComponent={setHasAssistantComponent}
      />
    </CommandMenu>
  );
};
