import React from "react";
import { useTranslation } from "react-i18next"; // Replicating (0, n.default)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Replicating d, c, m
import { Skeleton } from "@/components/ui/skeleton"; // Replicating h.Skeleton
import { Typography as Text } from "@/ui/primitives/Typography"; // Replicating p.Text
import { SplitSectionCard as CardLayout } from "@/ui/components/SplitSectionCard"; // Replicating v.CardLayout
import { Button } from "@/components/ui/button"; // Replicating x.Button
import { useTransport } from "@/hooks/useTransport"; // Replicating u.useTransport
import { usePermission } from "@/hooks/usePermission"; // Replicating s.usePermission
import { useRequestErrorToast } from "@/hooks/useRequestErrorToast"; // Replicating f.useRequestErrorToast
import { useIsMobile } from "@/hooks/use-mobile"; // Replicating a.default, though usually it's useIsLoading or similar? Let's assume a hook.

// Mocking query options/mutations based on minified patterns
// (0, r.domainJoinableTeamsQueryOptions)
// (0, l.joinDomainTeamMutation)
// (0, o.listUserInvitationsQuery)
// (0, r.listTeamsQuery)

interface Team {
  teamId: string;
  name: string;
}

interface JoinDomainTeamVariables {
  teamId: string;
}

export interface DomainJoinableTeamsProps {}

export function DomainJoinableTeams({}: DomainJoinableTeamsProps) {
  const { t } = useTranslation("joinable-teams");
  const { showErrorToast } = useRequestErrorToast();
  const queryClient = useQueryClient();
  const transport = useTransport();
  
  const hasPermission = usePermission(["user-team:team-management:read"]);
  const isMobile = useIsMobile(); // a.default()

  const queryOptions = React.useMemo(() => ({
    queryKey: ["domain-joinable-teams", transport],
    queryFn: async () => {
      // Replicating (0, r.domainJoinableTeamsQueryOptions)
      return [] as Team[];
    },
    select: (data: Team[]) => data, // g in minified code
  }), [transport]);

  const { data, isPending, isError } = useQuery(queryOptions);
  const joinableTeams = data ?? [];

  const joinMutationOptions = React.useMemo(() => ({
    mutationFn: async ({ teamId }: JoinDomainTeamVariables) => {
      // Replicating (0, l.joinDomainTeamMutation)
    },
    onError: showErrorToast,
  }), [showErrorToast]);

  const { mutate: joinTeam } = useMutation(joinMutationOptions);

  const handleJoin = React.useCallback((teamId: string) => {
    joinTeam(
      { teamId },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["user-invitations"] }),
            queryClient.invalidateQueries({ queryKey: ["domain-joinable-teams"] }),
            queryClient.invalidateQueries({ queryKey: ["teams"] }),
          ]);
        },
      }
    );
  }, [joinTeam, queryClient]);

  if (!hasPermission || isMobile) {
    return null;
  }

  if (isPending) {
    return <Skeleton className="h-8 w-20 rounded-lg" />;
  }

  if (isError) {
    return (
      <CardLayout
        title={t("title")}
        description={t("description")}
      >
        <Text
          variant="body5"
          color="subtle"
          className="max-w-xs flex-wrap text-center"
        >
          {t("error")}
        </Text>
      </CardLayout>
    );
  }

  if (joinableTeams.length === 0) {
    return null;
  }

  return (
    <CardLayout
      title={t("title")}
      description={t("description")}
    >
      <div className="flex flex-col gap-2">
        {joinableTeams.map((team) => (
          <div
            key={team.teamId}
            className="flex items-center justify-between gap-2 border-b pb-2 last:border-none"
          >
            <Text variant="body5">{team.name}</Text>
            <Button
              variant="accent"
              size="xs"
              onClick={() => handleJoin(team.teamId)}
            >
              {t("join")}
            </Button>
          </div>
        ))}
      </div>
    </CardLayout>
  );
}
