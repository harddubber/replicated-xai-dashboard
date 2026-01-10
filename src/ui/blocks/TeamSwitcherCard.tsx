import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

// Assuming these are the types/interfaces based on the minified code
interface Team {
  teamId: string;
  name: string;
}

interface ListTeamsResponse {
  teams: Team[];
}

// Mocking some of the imported utilities and hooks mentioned in the code
// Since I don't have the actual implementation of these, I'll define them as they appear to be used.
const useTransport = () => ({}); 
const useTeam = () => ({ teamId: "current-team-id" });
const useSession = () => ({ integrationSession: { isIntegration: false } });
const listTeamsQuery = (params: { transport: any }) => ({
  queryKey: ["teams"],
  queryFn: async () => ({ teams: [] } as ListTeamsResponse),
});

// UI Components (Placeholders based on usage)
const Text = ({ children, variant, color, className }: any) => (
  <div className={cn(variant, color, className)}>{children}</div>
);
const Badge = ({ children, variant }: any) => <span className={variant}>{children}</span>;
const Button = ({ children, variant, size, asChild, onClick, className }: any) => {
  if (asChild) return <>{children}</>;
  return <button onClick={onClick} className={cn(variant, size, className)}>{children}</button>;
};
const StackedSkeleton = () => <div>Loading...</div>;
const CardLayout = ({ title, description, actions, children }: any) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    {actions}
    <div>{children}</div>
  </div>
);

const MAX_TEAM_COUNT = 10;

const sortTeams = (a: Team, b: Team) => a.name.localeCompare(b.name);

export interface TeamSwitcherCardProps {}

export function TeamSwitcherCard({}: TeamSwitcherCardProps) {
  const { t } = useTranslation("teams");
  const transport = useTransport();
  const { teamId: currentTeamId } = useTeam();
  const router = useRouter();
  const session = useSession();
  const isNotIntegration = !session.integrationSession?.isIntegration;

  const [switchingToId, setSwitchingToId] = useState<string>("");

  const queryOptions = {
    ...listTeamsQuery({ transport }),
    select: (data: ListTeamsResponse) => {
      const sorted = [...data.teams].sort(sortTeams);
      return {
        currentTeam: sorted.find((t) => t.teamId === currentTeamId),
        otherTeams: sorted.filter((t) => t.teamId !== currentTeamId),
        totalTeams: sorted.length,
      };
    },
  };

  const { data, isPending, isError } = useQuery(queryOptions);

  const handleSelectTeam = (id: string) => {
    setSwitchingToId(id);
    // This logic seems to redirect the user to the home page for the selected team
    router.push(`/?teamId=${id}`); 
  };

  if (isPending) {
    return <StackedSkeleton />;
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

  const { currentTeam, otherTeams = [], totalTeams = 0 } = data || {};

  if (totalTeams <= 1) {
    return null;
  }

  const canCreateTeam = totalTeams < MAX_TEAM_COUNT && isNotIntegration;

  const actions = canCreateTeam && (
    <Button variant="link" className="underline" asChild>
      <Link href="/create-team">
        {t("create-new")}
      </Link>
    </Button>
  );

  const currentTeamSection = currentTeam ? (
    <div className="flex items-center justify-between gap-3 rounded-t-[inherit] border-b pb-4">
      <div>
        <Text variant="body5" className="line-clamp-1 font-medium">
          {currentTeam.name}
        </Text>
      </div>
      <div>
        <Badge variant="secondary">{t("current-team")}</Badge>
      </div>
    </div>
  ) : null;

  const otherTeamsList = otherTeams.length > 0 ? (
    <>
      {otherTeams.map((team) => (
        <div key={team.teamId} className="flex items-center justify-between gap-3 py-2">
          <div>
            <Text variant="body5" color="subtle" className="line-clamp-1 font-medium">
              {team.name}
            </Text>
          </div>
          <div>
            {switchingToId === team.teamId ? (
              <Text variant="body6" color="subtle" className="py-1">
                {t("switching")}
              </Text>
            ) : (
              <Button
                size="xs"
                variant="secondary"
                onClick={() => handleSelectTeam(team.teamId)}
              >
                {t("select")}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  ) : (
    <Text variant="body5" color="subtle" className="py-4 text-center">
      {t("no-teams")}
    </Text>
  );

  const footer = (
    <div className="flex items-center justify-between gap-3 rounded-b-[inherit] border-t pt-4">
      <div>
        <Text variant="body6" color="subtle">
          {t("total-teams", { length: totalTeams })}
        </Text>
      </div>
      <div>
        {totalTeams >= MAX_TEAM_COUNT ? (
          <Text variant="body6" color="subtle">
            {t("team-limit")}
          </Text>
        ) : (
          isNotIntegration && (
            <Button size="sm" variant="accent" asChild>
              <Link href="/create-team">
                {t("create-new")}
              </Link>
            </Button>
          )
        )}
      </div>
    </div>
  );

  return (
    <CardLayout
      title={t("title")}
      description={t("description")}
      actions={actions}
    >
      {currentTeamSection}
      <div className="py-2">
        <div className="divide-border-muted divide-y">
          {otherTeamsList}
        </div>
      </div>
      {footer}
    </CardLayout>
  );
}
