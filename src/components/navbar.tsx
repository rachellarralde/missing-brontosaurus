import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-muted z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <div className="flex items-center">
            <span className="text-foreground font-bold text-sm">Missing Brontosaurus</span>
          </div>
          <div className="flex space-x-8">
            <Link href="/" className="text-foreground text-sm hover:text-muted-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground text-sm hover:text-muted-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 