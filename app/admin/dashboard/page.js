"use client";
import { ScoreCard } from "@/app/components/scorecard";
import { getMatch } from "@/app/events/serverActions";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Page() {
  const [matchDetails, setMatchDetails] = useState(null);
  const [ball, setBall] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await getMatch(1);
      setMatchDetails(res);
      setBall({
        runs: null,
        extras: 0,
        striker: 1,
        nonStriker: 2,
        bowler: 1,
        status: "none",
        battingTeam: res.battingTeam,
        bowlingTeam: res.bowlingTeam,
        striker: res.striker,
        nonStriker: res.nonStriker,
      });
    };
    getData();
  }, []);
  useEffect(() => {
    function onFooEvent(value) {
      setMatchDetails(value);
      setBall({
        runs: null,
        extras: 0,
        striker: 1,
        nonStriker: 2,
        bowler: 1,
        status: "none",
        battingTeam: value.battingTeam,
        bowlingTeam: value.bowlingTeam,
        striker: value.striker,
        nonStriker: value.nonStriker,
        striker: value.striker,
        nonStriker: value.nonStriker,
      });
    }
    function disconnect() {
      console.log("user disconnected");
    }
    socket.on("match", onFooEvent);
    socket.on("disconnect", disconnect);
    return () => {
      socket.off("match", onFooEvent);
      socket.off("disconnect", disconnect);
    };
  }, [socket]);
  const handleMatchUpdate = () => {
    setBall({
      ...ball,
      striker: matchDetails.striker,
      nonStriker: matchDetails.nonStriker,
      bowler: matchDetails.bowler,
    });

    socket.emit("UpdateMatch", {
      matchDetails: matchDetails,
      ball: { ...ball, bowler: matchDetails.bowler },
    });
  };

  return matchDetails ? (
    <div className="w-full p-2 min-h-screen h-full flex flex-row bg-slate-900 ">
      <div className="border min-h-full w-3/4 rounded  text-white">
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            <label className="p-2">Batting</label>
            <select
              className="p-2 m-2 border-2 rounded bg-black"
              name="Batting"
              value={matchDetails.battingTeam}
              onChange={(e) =>
                setMatchDetails({
                  ...matchDetails,
                  battingTeam: parseInt(e.target.value),
                  bowlingTeam: parseInt(e.target.value) === 1 ? 2 : 1,
                })
              }
            >
              <option value={1}>Team 1</option>
              <option value={2}>Team 2</option>
            </select>
          </div>
          {/* striker batsman */}
          <div className="flex flex-col">
            <label className="p-2">Batsman (Striker)</label>
            <select
              className="p-2 m-2 border-2 rounded bg-black"
              name="Bowling"
              value={
                matchDetails.teams[matchDetails.battingTeam - 1].members[
                  matchDetails.striker - 1
                ].id
              }
              onChange={(e) =>
                setMatchDetails({
                  ...matchDetails,
                  striker: parseInt(e.target.value),
                })
              }
            >
              {matchDetails.teams[matchDetails.battingTeam - 1].members.map(
                (member, index) => (
                  <option value={member.id} key={index}>
                    {member.name}
                  </option>
                )
              )}
            </select>
          </div>
          {/* non striker batsman */}
          <div className="flex flex-col">
            <label className="p-2">Batsman (non-Striker)</label>
            <select
              className="p-2 m-2 border-2 rounded bg-black"
              name="nonStriker"
              value={
                matchDetails.teams[matchDetails.battingTeam - 1].members[
                  matchDetails.nonStriker - 1
                ].id
              }
              onChange={(e) =>
                setMatchDetails({
                  ...matchDetails,
                  nonStriker: parseInt(e.target.value),
                })
              }
            >
              {matchDetails.teams[matchDetails.battingTeam - 1].members.map(
                (member, index) => (
                  <option value={member.id} key={index}>
                    {member.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="p-2">Bowler</label>
            <select
              className="p-2 m-2 border-2 rounded bg-black"
              name="Bowling"
              value={
                matchDetails.teams[matchDetails.bowlingTeam - 1].members[
                  matchDetails.bowler - 1
                ].id
              }
              onChange={(e) =>
                setMatchDetails({
                  ...matchDetails,
                  bowler: parseInt(e.target.value),
                })
              }
            >
              {matchDetails.teams[matchDetails.bowlingTeam - 1].members.map(
                (member, index) => (
                  <option value={member.id} key={index}>
                    {member.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="flex flex-col p-1">
          Status:
          <div className="grid grid-cols-7">
            {[0, 1, 2, 3, 4, 5, 6].map((run, index) => (
              <button
                className={`${
                  ball.runs == run
                    ? "bg-gray-600"
                    : run > 2
                    ? run > 4
                      ? "bg-red-600"
                      : "bg-green-500"
                    : run == 0
                    ? "bg-slate-400"
                    : "bg-blue-500"
                } text-white p-4 m-2 rounded border-2 border-transparent hover:border-gray-400 active:bg-gray-600 `}
                key={index}
                onClick={() => {
                  if (ball.runs == run)
                    setBall({ ...ball, runs: null, status: "none" });
                  else setBall({ ...ball, runs: run, status: "run" });
                }}
              >
                {run}
              </button>
            ))}
          </div>
        </div>
        <div className="p-1">
          Extras:
          <div className="grid grid-cols-4 ">
            {[
              "Wide",
              "No Ball",
              "Bye",
              "Leg Bye",
              "No ball",
              "1 or 2",
              "2 or 4",
              "3",
            ].map((extra, index) => (
              <button
                className="bg-black text-white p-5 m-2 rounded border-2 border-transparent hover:border-gray-400 active:bg-gray-600"
                key={index}
              >
                {extra}
              </button>
            ))}
          </div>
        </div>
        <div className="p-1">
          Extras:
          <div className="grid grid-cols-4 ">
            {["Wicket", "Misfield", "Review", "Overthrow"].map(
              (extra, index) => (
                <button
                  className="bg-black text-white p-5 m-2 rounded border-2 border-transparent hover:border-gray-400 active:bg-gray-600"
                  key={index}
                >
                  {extra}
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="m-5">
            <ol className="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-white sm:grid-cols-3">
              <li className="flex items-center justify-center gap-2 p-4 bg-slate-700">
                <div className="leading-none text-center">
                  {ball.runs != null ? (
                    <div>
                      <small className="mt-1 text-3xl">{ball.runs} </small>
                      <strong className="block font-medium"> Runs </strong>
                    </div>
                  ) : (
                    <div>Update State</div>
                  )}
                </div>
              </li>

              <li className="relative flex items-center justify-center gap-2 bg-slate-800 p-4">
                <span className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"></span>

                <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"></span>

                <div className="leading-none text-center">
                  {ball.extra != null ? (
                    <div>
                      <small className="mt-1 text-3xl">{ball.extra} </small>
                      <strong className="block font-medium"> Extras </strong>
                    </div>
                  ) : (
                    <div>Update Extra</div>
                  )}
                </div>
              </li>

              <li className="flex items-center justify-center gap-2 p-4">
                <p className="leading-none text-center">
                  <small className="mt-1 text-xl uppercase">
                    {" "}
                    {ball.status}
                  </small>
                  <strong className="block font-medium"> Comments </strong>
                </p>
              </li>
            </ol>
          </div>

          <button
            className="bg-black text-white p-2 m-2 rounded border-2 border-transparent hover:border-gray-400 active:bg-gray-600"
            onClick={handleMatchUpdate}
          >
            Update
          </button>
        </div>
      </div>
      <div className="border h-full w-1/4 rounded bg-black text-white">
        <ScoreCard></ScoreCard>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
