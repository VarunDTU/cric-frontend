"use client";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { getMatch } from "../events/serverActions";
import CommentaryBox from "./commentary";

export function ScoreCard() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await getMatch(1);
      setFooEvents(res);
    };
    getData();
  }, []);
  useEffect(() => {
    async function onConnect() {
      console.log("user connected", socket.id);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("match", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", (data) => onDisconnect(data));
      socket.off("match", onFooEvent);
    };
  }, [socket]);
  const battingTeam = fooEvents
    ? fooEvents.teams[fooEvents.battingTeam - 1]
    : [];
  const bowlingTeam = fooEvents
    ? fooEvents.teams[fooEvents.bowlingTeam - 1]
    : [];

  return fooEvents ? (
    <div className="min-h-screen">
      <div className="h-1/2 border-b-2">
        <div className="flex flex-col justify-between h-full">
          <div className="text-center flex flex-row items-center justify-center p-2">
            <div className="">Score Card</div>
            {isConnected ? (
              <div className="justify-start align-text-top m-1 w-2 h-2 rounded bg-green-500"></div>
            ) : (
              <div className="justify-start align-text-top m-1 w-2 h-2 rounded bg-gray-500"></div>
            )}
          </div>
          <div className="flex flex-row justify-evenly ">
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {battingTeam.score}/{battingTeam.wickets}
              </div>
              <div className="">
                {Math.floor(battingTeam.balls / 6)}.{battingTeam.balls % 6}{" "}
                overs
              </div>
            </div>
            vs
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {bowlingTeam.score}/{bowlingTeam.wickets}
              </div>
              <div className="">
                {Math.floor(bowlingTeam.balls / 6)}.{bowlingTeam.balls % 6}{" "}
                overs
              </div>
            </div>
          </div>
          <div className="border-y w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 text-left text-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium  ">
                      Batsman
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium  ">
                      Runs
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium  ">
                      4s
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium  ">
                      6s
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium  ">
                      {battingTeam.members[fooEvents.striker - 1].name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.striker - 1].runs}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.striker - 1].fours}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.striker - 1].sixes}
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium  ">
                      {battingTeam.members[fooEvents.nonStriker - 1].name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.nonStriker - 1].runs}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.nonStriker - 1].fours}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 ">
                      {battingTeam.members[fooEvents.nonStriker - 1].sixes}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full border-t mb-5">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="pl-4">Bowler</th>
                  <th className="pl-4">Wickets</th>
                  <th className="pl-4">Balls</th>
                </tr>
                <tr className="border-y-2 ">
                  <td className="pl-4 cursor-pointer">
                    {bowlingTeam.members[fooEvents.bowler - 1].name}
                  </td>
                  <td className="pl-4">
                    {bowlingTeam.members[fooEvents.bowler - 1].wicketsTaken}
                  </td>
                  <td className="pl-4">
                    {bowlingTeam.members[fooEvents.bowler - 1].ballsBowled}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="h-1/2">
        <CommentaryBox balls={fooEvents.balls}></CommentaryBox>
      </div>
    </div>
  ) : (
    <div>something went wrong</div>
  );
}
