"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Navlinks } from "./Navlinks";

type NavLink = Omit<(typeof Navlinks)[0], "requiresLogin"> & {
  isVisible: boolean;
};

interface NavLinkProps {
  link: NavLink;
  className?: string;
  onClick: () => void;
  activeClassNames?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  link: { isVisible, name, path },
  activeClassNames,
  className,
  onClick,
}) => {
  const currentPathname = usePathname();
  const linkPath = path;
  const isActive = linkPath === currentPathname;

  if (!isVisible) return null;

  return (
    <Link
      onClick={onClick}
      href={linkPath}
      className={`${isActive ? activeClassNames : ""} ${className}`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
