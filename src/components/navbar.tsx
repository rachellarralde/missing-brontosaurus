import Link from 'next/link'
import MaxText from './ui/MaxText'

const carnotaurusTopMarginPercent = 0.19;
const carnotaurusBottomMarginPercent = 0.28;

export default function Navbar() {
  return (
    <nav className="mb-8">
      <Link href="/">
        <div className="grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
          <div className="col-span-2 self-center">
            <MaxText text="MISSING" topMarginPercent={carnotaurusTopMarginPercent} bottomMarginPercent={carnotaurusBottomMarginPercent} />
          </div>
          <div className="col-span-1 self-center content-center">
            <img src="/logos/tight-crop.png" alt="A brontosaurus with a bold question mark" />
          </div>
          <div className="col-span-2 self-center">
            <MaxText text="BRONTO" topMarginPercent={carnotaurusTopMarginPercent} bottomMarginPercent={carnotaurusBottomMarginPercent} />
          </div>
          <div className="col-span-2 self-center">
            <MaxText text="SAURUS" topMarginPercent={carnotaurusTopMarginPercent} bottomMarginPercent={carnotaurusBottomMarginPercent} />
          </div>
        </div>
      </Link>
    </nav>
  )
}
