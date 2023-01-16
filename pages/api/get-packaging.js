import { supabase } from "helpers/supabase";

const GetPackaging = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("kemasan_minuman").select("*");
    return res.status(200).json({ data, error });
  }
};

export default GetPackaging;
