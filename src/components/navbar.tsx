import Link from 'next/link'
import { pacificaSans } from '@/app/typography'
import MaxText from './ui/MaxText'

const logoStyle = `${pacificaSans.variable} text-8xl font-bold text-foreground w-1/4`

export default function Navbar() {
  return (
    <nav className="">

      <div className="grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1">
        <div className="col-span-2">
          <MaxText text="MISSING" />
        </div>
        <div className="col-span-1 text-center align-middle">
          <img src="/logos/tight-crop.png" alt="A brontosaurus with a bold question mark"/>
        </div>
        <div className="col-span-2">
          <MaxText text="BRONTO"/>
        </div>
        <div className="col-span-2">
          <MaxText text="SAURUS"/>
        </div>
        
      </div>
{/* 
      <div>
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
      </div> */}
    </nav>
  )
} 