"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllMatches } from "../events/serverActions";
import { matchResultsRecent } from "./result";

export default function MatchDirectory() {
  const router = useRouter();
  const [matches, setmatches] = useState(null);
  useEffect(() => {
    getAllMatches().then((res) => {
      console.log(res);
      setmatches(res);
    });
  }, []);
  //   const battingTeam = matches ? matches.teams[matches.battingTeam - 1] : [];
  //   const bowlingTeam = matches ? matches.teams[matches.bowlingTeam - 1] : [];
  if (!matches) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="w-full h-screen bg-slate-900 flex items-center justify-center ">
        <div className="w-1/2 h-full border rounded m-2">
          <div className="h-1/4">
            <div className="flex flex-row justify-center items-center">
              <h2 className="text-2xl font-bold text-center p-2">
                Live Matches
              </h2>
              <div className="w-2 h-2 bg-green-400 rounded"></div>
            </div>
            <div className="flex flex-col">
              {matches.map((match) => {
                const battingTeam = match
                  ? match.teams[match.battingTeam - 1]
                  : [];
                const bowlingTeam = match
                  ? match.teams[match.bowlingTeam - 1]
                  : [];
                return (
                  <div
                    key={match.matchid}
                    className=" bg-slate-800 border rounded m-2 p-2 cursor-pointer"
                    onClick={() => router.push(`/scorecard/${match._id}`)}
                  >
                    <div className="flex flex-row justify-evenly ">
                      <div className="flex flex-col">
                        <div className="text-xl font-bold">
                          {battingTeam.score}/{battingTeam.wickets}
                        </div>
                        <div className="">
                          {Math.floor(battingTeam.balls / 6)}.
                          {battingTeam.balls % 6} overs
                        </div>
                      </div>
                      vs
                      <div className="flex flex-col">
                        <div className="text-xl font-bold">
                          {bowlingTeam.score}/{bowlingTeam.wickets}
                        </div>
                        <div className="">
                          {Math.floor(bowlingTeam.balls / 6)}.
                          {bowlingTeam.balls % 6} overs
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-3/4 overflow-hidden">
            <h2 className="text-2xl font-bold text-center p-2">
              Recent Results
            </h2>
            <div className="h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {matchResultsRecent.data.slice(0, 20).map((result, index) => {
                return (
                  <div
                    key={result.id}
                    className="border p-2 m-1 rounded backdrop-blur-md bg-black/20"
                  >
                    <div className="flex flex-row ">
                      <div className="mx-2 w-10">{index}</div>
                      <div>{result.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
}
