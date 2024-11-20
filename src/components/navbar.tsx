import Link from 'next/link'
import MaxText from './ui/MaxText'

const carnotaurusMarginPercent = 0.15;

export default function Navbar() {
  return (
    <nav className="">
      <Link href="/">
        <div className="grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
          <div className="col-span-2 self-center">
            <MaxText text="MISSING" topMarginPercent={carnotaurusMarginPercent} bottomMarginPercent={carnotaurusMarginPercent} />
          </div>
          <div className="col-span-1 self-center">
            <img src="/logos/tight-crop.png" alt="A brontosaurus with a bold question mark" />
          </div>
          <div className="col-span-2 self-center">
            <MaxText text="BRONTO" topMarginPercent={carnotaurusMarginPercent} bottomMarginPercent={carnotaurusMarginPercent} />
          </div>
          <div className="col-span-2 self-center">
            <MaxText text="SAURUS" topMarginPercent={carnotaurusMarginPercent} bottomMarginPercent={carnotaurusMarginPercent} />
          </div>
        </div>
      </Link>
    </nav>
  )
}
