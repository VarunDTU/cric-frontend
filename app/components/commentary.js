export default function CommentaryBox({ balls }) {
  const last6Balls = balls.slice(-6);

  return (
    <div className="">
      <div className="text-center p-2">Live Commentary</div>

      <div className="flex flex-col-reverse overflow-y-scroll max-h-full [&::-webkit-scrollbar]:hidden ">
        {last6Balls.map((ball, index) => {
          return (
            <div key={index} className="flex flex-row items-center m-2">
              <div
                className={`m-1 rounded-full px-3 p-1  ${
                  ball.runs > 2
                    ? ball.runs > 4
                      ? "bg-red-600"
                      : "bg-green-500"
                    : ball.runs == 0
                    ? "bg-slate-400"
                    : "bg-blue-500"
                }`}
              >
                {ball.runs}
              </div>
              <div className="text-sm">
                <p>{ball.commentary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
