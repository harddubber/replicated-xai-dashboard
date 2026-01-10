import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/ui/components/Avatar3";
import { AvatarImage } from "@/ui/components/AvatarImage3";
import { AvatarFallback } from "@/ui/components/AvatarFallback2";

export interface UserAvatarProps {
  className?: string;
  imageUrl?: string;
  alt?: string;
  fallbackText?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * UserAvatar component that displays a user's profile image with a fallback text option.
 * It integrates with specialized Avatar, AvatarImage, and AvatarFallback components.
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  imageUrl,
  alt,
  fallbackText,
  onClick,
}) => {
  const clickableClasses = onClick
    ? "cursor-pointer transition-colors hover:opacity-80"
    : "";

  return (
    <Avatar
      className={cn(className, clickableClasses)}
      onClick={onClick}
    >
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};
