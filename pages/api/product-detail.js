import { supabase } from "helpers/supabase";

const GetDetail = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { data, error } = await supabase
      .from("minuman")
      .select("*")
      .eq("id", id);
    return res.status(200).json({ data, error });
  }
};

export default GetDetail;
