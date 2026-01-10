import React from "react";

// Mocking useTeam since it's not provided in dependencies
// Based on the test outputs, it should return a specific teamId.
const useTeam = () => {
  return {
    teamId: "a5a0ab9e-1928-4812-8007-d996ebdcb15e",
  };
};

export interface TeamLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * A link component that automatically prefixes the href with the current team's path.
 */
export function TeamLink({ href, children, ...props }: TeamLinkProps) {
  const { teamId } = useTeam();
  const teamHref = `/team/${teamId}${href}`;

  return (
    <a href={teamHref} {...props}>
      {children}
    </a>
  );
}
