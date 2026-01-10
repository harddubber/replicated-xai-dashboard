import React from "react";

export interface SidebarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

// Mocking the context hook since it's not provided in dependencies
// In a real scenario, this would likely come from a SidebarContext
const useSidebar = () => {
  return {
    setSidebarOpen: (open: boolean) => {
      // Stub implementation
    },
  };
};

// Mocking c.default which appears to be a Link component (like next/link)
const NextLink = React.forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ href, onClick, children, ...props }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, ...props }) => {
  const { setSidebarOpen } = useSidebar();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSidebarOpen(false);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  // If it's an internal link (doesn't start with http)
  if (href && !href.startsWith("http")) {
    // Note: The original code used a custom Link component (c.default)
    // and stripped trailing slashes if present in some contexts, 
    // but the tests show both with and without. 
    // Looking at Test N360, the input href has a trailing slash but output doesn't.
    // However, other tests show they match. 
    // Let's handle the trailing slash normalization if needed.
    const normalizedHref = href.endsWith("/") && href.length > 1 ? href.slice(0, -1) : href;

    return (
      <NextLink href={normalizedHref} onClick={handleClick} {...props} />
    );
  }

  // If it's an external link or no href
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  );
};
