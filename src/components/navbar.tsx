import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Dialog", href: "/dialog" },
  ];

  return (
    <nav className="w-screen h-16 flex items-center justify-center">
      <ul className="flex gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
