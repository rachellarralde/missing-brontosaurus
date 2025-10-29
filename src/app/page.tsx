import DinoGame from '@/components/dino-game'
import TitledCard from '@/components/fragments/TitledCard';
import LatestRelease from '@/components/LatestRelease';

const homePageItemStyle = "w-full md:w-1/2 p-2";

export default function Home() {
  return (
    <div className="w-full lg:w-3/4 mx-auto flex flex-col lg:flex-row flex-wrap items-center lg:items-stretch justify-center">

      <div className={homePageItemStyle}>
        <LatestRelease />
      </div>
      <div className={homePageItemStyle}>
        <TitledCard title="&nbsp;" className="w-full h-full">
          <DinoGame />
        </TitledCard>
      </div>
    </div>
  );
}
