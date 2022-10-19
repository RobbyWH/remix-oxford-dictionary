import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { useRouteData } from "remix-utils";
import invariant from "tiny-invariant";
import type {DictionariesProps} from "../list";
import { getDictionaryById } from "~/models/dictionary.server";

export async function loader({params}: LoaderArgs) {
  invariant(params.dictionaryId, "Dictionary not found");
  return json({
    dictionary: await getDictionaryById({id: params.dictionaryId}),
  });
};

export default function DictionaryDetailPage () {
  const { dictionary } = useLoaderData<typeof loader>();
  const dictionaryData = useRouteData<DictionariesProps>("routes/dictionaries/list");
  const {dictionaryId} = useParams();
  console.log("Params DictionaryId", dictionaryId);
  console.log("Dictionary Data", dictionaryData?.dictionaries[0]?.word)
  console.log("Dictionary Detail", dictionary?.word)
  return (
    <div className="p-5">
      <div className="p-5">
        <div>
          <h1 className="text-lg font-semibold">{dictionary?.word}</h1>
        </div>
        <div>
          <p>{dictionary?.description}</p>
        </div>
      </div>
      <hr/>
      <Outlet />
    </div>
  );
}
