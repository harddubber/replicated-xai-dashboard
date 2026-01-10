import React from "react";
import { cn } from "@/lib/utils";

// Mocking the dependencies based on the minified code's usage
// These would typically be imported from their respective modules
const useTeam = () => {
  // This is a placeholder for (0, j.useTeam)()
  return { organizationId: "" };
};

const useConstants = () => {
  // This is a placeholder for (0, Z.useConstants)()
  return { xaiOrganizationId: "xai-org-id", xOrganizationId: "x-org-id" };
};

interface ShieldIconProps {
  size?: string | number;
  className?: string;
}

const ShieldIcon = ({ size = "18px", className }: ShieldIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    [[SVG:0|PATH:0|NAME:ShieldIcon|DESCRIPTION:Shield icon for internal team badge]]
  </svg>
);

interface TextProps {
  variant?: "body5" | "body6";
  className?: string;
  children: React.ReactNode;
}

const Text = ({ variant, className, children }: TextProps) => {
  return <span className={className}>{children}</span>;
};

export interface InternalTeamBadgeProps {
  className?: string;
}

/**
 * A component that displays a badge if the current team belongs to xAI or X organization.
 */
export const InternalTeamBadge: React.FC<InternalTeamBadgeProps> = ({ className }) => {
  const team = useTeam();
  const { xaiOrganizationId, xOrganizationId } = useConstants();

  const organizationType = React.useMemo(() => {
    if (team.organizationId === xaiOrganizationId) {
      return "xai";
    }
    if (team.organizationId === xOrganizationId) {
      return "x";
    }
    return null;
  }, [team.organizationId, xaiOrganizationId, xOrganizationId]);

  if (!organizationType) {
    return null;
  }

  const label = organizationType === "xai" ? "xAI" : "X";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-blue-600 p-1 text-left text-white",
        className
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/30">
        <ShieldIcon size="18px" />
      </div>
      <div className="py-1.5 pe-3 ps-2">
        <Text
          variant="body5"
          className="hidden truncate text-white md:block"
        >
          Internal {label} Team
        </Text>
        <Text
          variant="body6"
          className="truncate text-white md:hidden"
        >
          {label}
        </Text>
      </div>
    </div>
  );
};
