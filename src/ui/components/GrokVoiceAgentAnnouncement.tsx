import { AnnouncementCard } from "@/ui/components/AnnouncementCard";
import React from "react";

// Mocking dependencies based on minified code context
// These would typically be imported from their respective modules
const useTeam = () => ({ teamId: "default-team" });
const useTransport = () => ({});
const listModelsForTeamQuery = (teamId: string, options: any) => ({
  teamId,
  ...options,
});
const getSortedModelsWithCluster = (data: any) => data;
const useQuery = (query: any) => ({ data: [{ cluster: "us-east-1" }] });
const useCluster = (defaultCluster: string, options: any) => ["us-east-1"];

export interface GrokVoiceAgentAnnouncementProps {}

/**
 * An announcement card specifically for the Grok Voice Agent API.
 * It fetches model information and displays the card if relevant models are available in the current cluster.
 */
export const GrokVoiceAgentAnnouncement: React.FC<
  GrokVoiceAgentAnnouncementProps
> = () => {
  const { teamId } = useTeam();
  const transport = useTransport();

  const query = React.useMemo(() => {
    const baseQuery = listModelsForTeamQuery(teamId, { transport });
    return { ...baseQuery, select: getSortedModelsWithCluster };
  }, [teamId, transport]);

  const { data: models } = useQuery(query);
  const clusterOptions = React.useMemo(
    () => ({ shallow: true, clearOnDefault: true }),
    []
  );
  const [currentCluster] = useCluster("us-east-1", clusterOptions);

  const filteredModels = React.useMemo(() => {
    const data = models ?? [];
    return data.filter(
      (model: any) =>
        model.cluster === currentCluster || currentCluster === "All"
    );
  }, [models, currentCluster]);

  if (filteredModels.length === 0) {
    return null;
  }

  return (
    <AnnouncementCard
      id="grok-voice-agent-api"
      title="Grok Voice Agent API"
      description="Our most advanced voice models now on our API"
      cta="Read more"
      href="https://docs.x.ai/docs/guides/voice"
      background={
        <div
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
          }}
        >
          <img
            src="/remote/voice-cover.webp"
            alt="Grok Voice Agent"
            width={300}
            height={150}
          />
        </div>
      }
      className="hidden w-full sm:block"
    />
  );
};
