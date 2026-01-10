import React from "react";

export interface RoundedSquareIconProps extends React.SVGProps<SVGSVGElement> {}

export function RoundedSquareIcon(props: RoundedSquareIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path d="m17.086 11.5-5.043-5.04 1.414-1.42 7.457 7.46-7.457 7.46-1.414-1.42 5.043-5.04H3.5v-2z" />
    </svg>
  );
}
