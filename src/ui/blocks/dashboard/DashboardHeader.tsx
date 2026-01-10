import { CommandMenuTrigger } from "@/ui/components/CommandMenuTrigger";
import { ModeToggle } from "@/ui/components/ModeToggle";
import {
  UserHeaderWidget,
  type Organization,
  type OrganizationRbacRole,
  type User,
} from "@/ui/components/UserHeaderWidget";
import { BookOpen } from "@/ui/icons/BookOpen";
import React from "react";

/**
 * Since the exact Tooltip structure isn't fully clear from the minified code's imports (x.Tooltip),
 * but TooltipTrigger and TooltipContent are in the dependencies, I'll use a local mock or
 * try to infer their usage. The minified code uses `x.Tooltip`, `x.TooltipTrigger`, `x.TooltipContent`.
 */

// I'll define a local Tooltip if not explicitly provided, but usually these come from a library.
// Looking at dependencies, C76/C77/C88/C89 are tooltip parts.
import { TooltipContent as TooltipContentBase } from "@/ui/components/TooltipContent";
import { TooltipTrigger as TooltipTriggerBase } from "@/ui/components/TooltipTrigger2";

// Mock Tooltip container if not provided
const TooltipContainer = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export interface DashboardHeaderProps {
  user: User | null;
  currentTeamId?: string;
  accountUrl?: string;
  consoleUrl?: string;
  docsUrl?: string;
  websiteUrl?: string;
  menuItems?: React.ReactNode;
  children?: React.ReactNode;
  organization?: Organization | null;
  organizationRbacRole?: OrganizationRbacRole | null;
}

export function DashboardHeader({
  user,
  currentTeamId,
  accountUrl,
  consoleUrl,
  docsUrl,
  websiteUrl,
  menuItems,
  children,
  organization,
  organizationRbacRole,
}: DashboardHeaderProps) {
  const documentationTooltip = docsUrl && (
    <TooltipContainer>
      <TooltipTriggerBase asChild>
        <a
          href={docsUrl}
          className="focus-visible:ring-ring flex size-14 items-center justify-center border-l hover:bg-overlay-hover focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOpen className="size-4" />
        </a>
      </TooltipTriggerBase>
      <TooltipContentBase side="bottom" sideOffset={4}>
        Documentation
      </TooltipContentBase>
    </TooltipContainer>
  );

  const consoleTooltip = consoleUrl && (
    <TooltipContainer>
      <TooltipTriggerBase asChild>
        <a
          href={consoleUrl}
          className="focus-visible:ring-ring flex size-14 items-center justify-center border-l hover:bg-overlay-hover focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Replicating the 'r' icon from minified code - typically a console/terminal icon */}
          {/* Since 'r' isn't explicitly imported in dependencies, I'll use a generic icon placeholder or BookOpen if same */}
          <div className="size-4" />
        </a>
      </TooltipTriggerBase>
      <TooltipContentBase side="bottom" sideOffset={4}>
        Console
      </TooltipContentBase>
    </TooltipContainer>
  );

  const userMenu = (
    <UserHeaderWidget
      user={user}
      teamId={currentTeamId}
      websiteUrl={websiteUrl}
      accountUrl={accountUrl}
      organization={organization}
      organizationRbacRole={organizationRbacRole}
      className="focus-visible:ring-ring flex size-14 items-center justify-center border-l hover:bg-overlay-hover focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1"
    />
  );

  return (
    <>
      <div className="h-14" />
      <div className="bg-background fixed right-0 top-0 z-10 flex h-14 w-full items-stretch justify-between border-b sm:left-[248px] sm:w-[calc(100%-248px)]">
        <div className="flex">
          <div className="h-14 min-w-14 sm:hidden" />
        </div>
        <div className="flex items-center">
          {menuItems}
          {children}
          <CommandMenuTrigger
            label="Search"
            className="hidden h-full rounded-none border-y-0 border-l border-r-0 focus-visible:z-10 sm:block sm:w-[200px]"
            color="subtle"
          />
          {documentationTooltip}
          {consoleTooltip}
          <ModeToggle triggerClassName="flex size-14 items-center justify-center rounded-none border-l p-0 [&>[data-slot=icon]]:sm:size-4 focus-visible:ring-ring focus-visible:z-10" />
          {userMenu as any}
        </div>
      </div>
    </>
  );
}
