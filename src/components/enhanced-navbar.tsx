"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import MaxText from "./ui/MaxText";

const carnotaurusTopMarginPercent = 0.19;
const carnotaurusBottomMarginPercent = 0.28;

interface NavigationItem {
  href: string;
  label: string;
}



// Navigation items data structure for Home, Team, and Releases pages
const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/releases', label: 'Releases' }
];

// Shared NavigationItem component for pill navigation styling
interface NavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  onClick?: () => void;
}

function NavigationItemComponent({ item, isActive, onClick }: NavigationItemProps) {
  return (
    <Link 
      href={item.href}
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-white text-black' 
          : 'text-white hover:bg-white hover:bg-opacity-20'
        }
      `}
    >
      {item.label}
    </Link>
  );
}

export default function EnhancedNavbar() {
  const pathname = usePathname(); // Active page detection using Next.js usePathname hook

  return (
    <nav className="mb-8 relative">
      {/* Large desktop layout - very wide screens */}
      <div className="hidden xl:grid grid-cols-7">
        <Link href="/" className="col-span-2 self-center">
          <MaxText
            text="MISSING"
            topMarginPercent={carnotaurusTopMarginPercent}
            bottomMarginPercent={carnotaurusBottomMarginPercent}
          />
        </Link>
        <div className="col-span-1 self-center content-center relative">
          <Link href="/" className="cursor-pointer block">
            <img
              src="/logos/tight-crop.png"
              alt="A brontosaurus with a bold question mark"
            />
          </Link>

          {/* Static Pill Navigation - always visible, centered below logo */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
            <div className="bg-transparent border border-white rounded-full px-2 py-1 flex items-center gap-1">
              {navigationItems.map((item) => (
                <NavigationItemComponent
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        </div>
        <Link href="/" className="col-span-2 self-center">
          <MaxText
            text="BRONTO"
            topMarginPercent={carnotaurusTopMarginPercent}
            bottomMarginPercent={carnotaurusBottomMarginPercent}
          />
        </Link>
        <Link href="/" className="col-span-2 self-center">
          <MaxText
            text="SAURUS"
            topMarginPercent={carnotaurusTopMarginPercent}
            bottomMarginPercent={carnotaurusBottomMarginPercent}
          />
        </Link>
      </div>

      {/* MacBook Pro and laptop screens - horizontal layout with better spacing */}
      <div className="hidden lg:grid xl:hidden grid-cols-5 gap-2">
        <Link href="/" className="col-span-2 self-center">
          <MaxText
            text="MISSING"
            topMarginPercent={carnotaurusTopMarginPercent}
            bottomMarginPercent={carnotaurusBottomMarginPercent}
          />
        </Link>
        <div className="col-span-1 self-center content-center relative">
          <Link href="/" className="cursor-pointer block">
            <img
              src="/logos/tight-crop.png"
              alt="A brontosaurus with a bold question mark"
            />
          </Link>

          {/* Static Pill Navigation - always visible, centered below logo */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
            <div className="bg-transparent border border-white rounded-full px-2 py-1 flex items-center gap-1">
              {navigationItems.map((item) => (
                <NavigationItemComponent
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        </div>
        <Link href="/" className="col-span-2 self-center">
          <MaxText
            text="BRONTOSAURUS"
            topMarginPercent={carnotaurusTopMarginPercent}
            bottomMarginPercent={carnotaurusBottomMarginPercent}
          />
        </Link>
      </div>

      {/* Tablets and smaller screens - compact stacked layout with small logo */}
      <div className="lg:hidden flex flex-col items-center space-y-3">
        {/* Logo section */}
        <Link href="/" className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <MaxText
                text="MISSING"
                topMarginPercent={carnotaurusTopMarginPercent}
                bottomMarginPercent={carnotaurusBottomMarginPercent}
              />
            </div>
          </div>
          
          <div className="w-20 h-20 my-1">
            <img
              src="/logos/tight-crop.png"
              alt="A brontosaurus with a bold question mark"
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <MaxText
                text="BRONTOSAURUS"
                topMarginPercent={carnotaurusTopMarginPercent}
                bottomMarginPercent={carnotaurusBottomMarginPercent}
              />
            </div>
          </div>
        </Link>

        {/* Navigation pills - always below the logo */}
        <div className="bg-transparent border border-white rounded-full px-2 py-1 flex items-center gap-1">
          {navigationItems.map((item) => (
            <NavigationItemComponent
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
