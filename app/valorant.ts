import axios from "axios";

const BASE_URL = "https://api.henrikdev.xyz/valorant";

type GetMMRResponse = {
  status: number;
  data: {
    name: string;
    tag: string;
    puuid: string;
    current_data: {
      currenttier: number;
      currenttierpatched: string;
      images: {
        small: string;
        large: string;
      };
      ranking_in_tier: number;
      elo: number;
    };
  };
};

export const getMMR = async (username: string, tag: string) => {
  const res = await axios.get<GetMMRResponse>(
    `${BASE_URL}/v2/mmr/na/${username}/${tag}`
  );
  if (res.status !== 200)
    throw new Error(`Error fetching MMR data for ${username}#${tag}`);

  return res.data;
};
