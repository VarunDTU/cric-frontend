import { ScoreCard } from "../components/scorecard";

export default function ClientScoreCard() {
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center ">
      <div className="w-1/2 h-full border rounded m-2">
        <ScoreCard />
      </div>
    </div>
  );
}
