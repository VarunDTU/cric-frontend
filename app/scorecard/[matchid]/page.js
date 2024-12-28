"use client";
import { use } from "react";
import { ScoreCard } from "../../components/scorecard";
export default function ClientScoreCard({ params }) {
  const matchId = use(params);
  console.log(matchId);
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center ">
      <div className="w-1/2 h-full border rounded m-2">
        <ScoreCard matchId={matchId.matchid} />
      </div>
    </div>
  );
}
