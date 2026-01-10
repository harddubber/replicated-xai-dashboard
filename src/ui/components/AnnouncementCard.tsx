import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/components/Card1";
import { CardContent } from "@/ui/components/CardContent";
import { Typography } from "@/ui/primitives/Typography";
import { Button } from "@/ui/components/Button";
import { X } from "@/ui/icons/X";

export interface AnnouncementCardProps {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  cta: React.ReactNode;
  background?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  href?: string;
  className?: string;
}

export function AnnouncementCard({
  id,
  title,
  description,
  cta,
  background,
  onClick,
  href,
  className,
}: AnnouncementCardProps) {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem(`hide-${id}-announcement`);
    if (!isDismissed) {
      setIsHidden(false);
    }
  }, [id]);

  if (isHidden) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsHidden(true);
    localStorage.setItem(`hide-${id}-announcement`, "true");
  };

  const cardContent = (
    <Card
      className={cn(
        "dark relative mb-2 h-64 bg-surface transition-all hover:bg-surface-l2 lg:-mr-2",
        className
      )}
      role="banner"
    >
      {background && (
        <figure className="absolute left-0 top-0 h-full w-full select-none">
          {background}
        </figure>
      )}
      <CardContent
        className="relative flex h-full flex-col p-4"
        onClick={onClick}
        role={onClick ? "button" : "contentinfo"}
      >
        <div className="mt-auto">
          <Typography size="xsmall" className="mb-0.5 font-medium">
            {title}
          </Typography>
          <Typography size="xsmall" color="muted" className="mb-3">
            {description}
          </Typography>
          <Button
            className="w-full rounded-full"
            size="sm"
            variant="secondary"
            asChild
          >
            <div>{cta}</div>
          </Button>
        </div>
      </CardContent>
      <Button
        size="icon"
        variant="ghost"
        className="absolute end-2 top-2 rounded-full"
        onClick={handleDismiss}
      >
        <X className="size-4" />
      </Button>
    </Card>
  );

  if (href) {
    if (href.includes("http")) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {cardContent}
        </a>
      );
    }
    // Assuming internal link if not http, but we don't have a Link component imported.
    // The minified code shows usage of T.default and O.default for N.
    // Given the environment, we use a simple <a> tag.
    return <a href={href}>{cardContent}</a>;
  }

  return cardContent;
}
