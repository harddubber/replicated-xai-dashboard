import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@/ui/components/DropdownMenuTrigger";
import { UserAvatar as Avatar } from "@/ui/components/UserAvatar";
import React from "react";

// Mocking/Stubbing internal logic for missing dependencies based on minified code patterns
// and instructions to "replicate the behaviour in-line or stub it out".

/**
 * DropdownMenu placeholder that manages open state.
 * In a real environment, this would be a Radix UI primitive.
 */
const DropdownMenu = ({ children, open, onOpenChange }: any) => {
  return <div data-state={open ? "open" : "closed"}>{children}</div>;
};

/**
 * DropdownMenuContent placeholder.
 */
const DropdownMenuContent = ({ children, className }: any) => {
  return (
    <div className={cn("dropdown-menu-content", className)}>{children}</div>
  );
};

/**
 * DropdownMenuItem placeholder.
 */
const DropdownMenuItem = ({ children, className, onClick, variant }: any) => {
  return (
    <div
      className={cn(
        "dropdown-menu-item",
        className,
        variant === "destructive" && "text-destructive"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * DropdownMenuSeparator placeholder.
 */
const DropdownMenuSeparator = () => <div className="h-px bg-border my-1" />;

/**
 * Text component placeholder.
 */
const Text = ({ children, className, variant, color }: any) => {
  return (
    <span className={cn(className, color === "subtle" && "text-subtle")}>
      {children}
    </span>
  );
};

/**
 * KdbShortcut placeholder.
 */
const KdbShortcut = ({ primaryKey, modifierKeys }: any) => {
  return (
    <span>
      {modifierKeys?.join("+")}+{primaryKey}
    </span>
  );
};

// SVG Path Placeholders as per instructions
const Command = ({ size }: { size?: number }) => (
  <span>[[SVG:0|PATH:0|NAME:Command|DESCRIPTION:Command icon]]</span>
);
const LifeBuoy = ({ size }: { size?: number }) => (
  <span>[[SVG:1|PATH:1|NAME:LifeBuoy|DESCRIPTION:LifeBuoy icon]]</span>
);
const HeartPulse = ({ size }: { size?: number }) => (
  <span>[[SVG:2|PATH:2|NAME:HeartPulse|DESCRIPTION:HeartPulse icon]]</span>
);
const FileText = ({ size }: { size?: number }) => (
  <span>[[SVG:3|PATH:3|NAME:FileText|DESCRIPTION:FileText icon]]</span>
);
const ClipboardCopy = ({ size }: { size?: number }) => (
  <span>
    [[SVG:4|PATH:4|NAME:ClipboardCopy|DESCRIPTION:ClipboardCopy icon]]
  </span>
);
const LogOut = ({ size }: { size?: number }) => (
  <span>[[SVG:5|PATH:5|NAME:LogOut|DESCRIPTION:LogOut icon]]</span>
);
const UserIcon = ({ size }: { size?: number }) => (
  <span>[[SVG:6|PATH:6|NAME:User|DESCRIPTION:User icon]]</span>
);

// Stubbed hooks
const useTranslation = (ns: string) => ({
  t: (key: string, params?: any) => key, // Simplest fallback
});

const useCommandMenu = () => ({
  open: () => console.log("Open command menu"),
});

const useRouter = () => ({
  push: (url: string) => console.log("Push", url),
  replace: (url: string) => console.log("Replace", url),
});

const useToast = () => ({
  show: (options: any) => console.log("Toast", options),
});

// Helper functions for initials/name processing (approximated from minified logic)
const x = (val: any): val is string =>
  typeof val === "string" && val.length > 0;
const w = (val: string) => val.charAt(0).toUpperCase();

export interface User {
  userId: string;
  email: string;
  familyName?: string;
  givenName?: string;
  xUserId?: string;
  emailConfirmed?: boolean;
  xSubscriptionType?: string;
  organizationId?: string | null;
  organizationRole?: number;
  createTime?: number;
  profileImageUrl?: string;
}

export interface Organization {
  name?: string;
  workosDsyncEnabled?: boolean;
}

export interface OrganizationRbacRole {
  roleName?: string;
  error?: string;
}

export interface UserHeaderWidgetProps {
  user: User | null;
  teamId?: string;
  websiteUrl?: string;
  accountUrl?: string;
  className?: string;
  organization?: Organization | null;
  organizationRbacRole?: OrganizationRbacRole | null;
}

export function UserHeaderWidget({
  user,
  teamId,
  websiteUrl,
  accountUrl,
  className,
  organization,
  organizationRbacRole,
}: UserHeaderWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation("base");
  const { open: openCommandMenu } = useCommandMenu();
  const router = useRouter();
  const { show: showToast } = useToast();

  if (!user) return null;

  const isManaged = !!user.organizationId;
  const isDsyncEnabled =
    isManaged &&
    organization?.workosDsyncEnabled &&
    organizationRbacRole?.roleName;

  const names = [user.givenName, user.familyName].filter(x);
  const fullName = names.join(" ");
  const initials = names.map(w).join("").substring(0, 2);

  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    handleClose();
    router.replace("/sign-out");
  };

  const handleAccountClick = () => {
    if (accountUrl) {
      router.push(accountUrl);
      handleClose();
    }
  };

  const handleSupportClick = () => {
    if (teamId) {
      window.open(
        `mailto:support@x.ai?subject=Support Inquiry for Team ${teamId}`,
        "_blank"
      );
    }
  };

  const handleCopyTeamId = async () => {
    if (teamId) {
      try {
        await navigator.clipboard.writeText(teamId);
        showToast({
          title: t("components.header.widget.copy-team-id-success"),
        });
      } catch (e) {
        console.error("Failed to copy to clipboard:", e);
        showToast({
          title: t("components.header.widget.copy-team-id-error"),
          variant: "destructive",
        });
      }
    }
  };

  const triggerAvatar = (
    <Avatar
      className="h-9 w-9"
      alt={fullName}
      imageUrl={user.profileImageUrl}
      fallbackText={initials}
    />
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={className}>
        {triggerAvatar}
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
