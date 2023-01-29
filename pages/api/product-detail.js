import { supabase } from "helpers/supabase";
import { tableMinuman } from "helpers/util";

const GetDetail = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { data, error } = await supabase
      .from(tableMinuman)
      .select("*")
      .eq("id", id);
    return res.status(200).json({ data, error });
  }
};

export default GetDetail;
