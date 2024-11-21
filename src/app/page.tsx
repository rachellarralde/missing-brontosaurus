import DinoGame from '@/components/dino-game'
import TitledCard from '@/components/fragments/TitledCard';
import LatestRelease from '@/components/LatestRelease';

const homePageItemStyle = "w-1/2 p-2";

export default function Home() {
  return (
    <div className="w-3/4 flex flex-row flex-wrap">

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
