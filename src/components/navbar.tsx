import Link from 'next/link'
import { pacificaSans } from '@/app/typography'
import MaxText from './ui/MaxText'

const logoStyle = `${pacificaSans.variable} text-8xl font-bold text-foreground w-1/4`

export default function Navbar() {
  return (
    <nav className="">
      <Link href="/">
        <div className="grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
          <div className="col-span-2">
            <MaxText text="MISSING" />
          </div>
          <div className="col-span-1 justify-center items-center content-center self-center">
            <img src="/logos/tight-crop.png" alt="A brontosaurus with a bold question mark" />
          </div>
          <div className="col-span-2">
            <MaxText text="BRONTO" />
          </div>
          <div className="col-span-2">
            <MaxText text="SAURUS" />
          </div>
        </div>
      </Link>
    </nav>
  )
}
