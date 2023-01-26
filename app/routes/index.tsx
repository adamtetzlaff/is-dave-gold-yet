import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { intlFormatDistance } from "date-fns";
import { getMMR } from "~/valorant";

const getDaysAgo = () => {
  // Tracking since Jan. 25th 2023
  return intlFormatDistance(new Date(2023, 0, 25, 0, 0, 0), new Date(), {
    numeric: "always",
    unit: "day",
  });
};

export const loader = async ({}: LoaderArgs) => {
  const mmrData = await getMMR("dphily", "NA1");
  return mmrData.data;
};

const Index = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col max-w-2xl m-auto mt-20 px-6 lg:p-0 space-y-16">
      <div className="text-center text-4xl font-semibold">
        Is Dave Gold Yet In Valorant?
      </div>
      <div className="text-6xl font-bold text-center">
        {data.current_data.currenttierpatched
          .toLocaleLowerCase()
          .includes("gold")
          ? "YES"
          : "NO"}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-2xl font-semibold">Current Stats</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-0">
          <div className="flex flex-col space-y-1">
            <div className="font-light text-sm">RANK</div>
            <div className="font-semibold text-lg">
              {data.current_data.currenttierpatched}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-light text-sm">RANKING IN TIER</div>
            <div className="font-semibold text-lg">
              {data.current_data.ranking_in_tier} / 100
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-light text-sm">ELO</div>
            <div className="font-semibold text-lg">{data.current_data.elo}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="font-light text-sm">TRACKING SINCE</div>
        <div className="font-semibold text-lg">{getDaysAgo()}</div>
      </div>
    </div>
  );
};

export default Index;
