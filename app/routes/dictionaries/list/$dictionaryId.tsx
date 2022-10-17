import { json, LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { useRouteData } from "remix-utils";
import invariant from "tiny-invariant";
import { getDictionaryById } from "~/models/dictionary.server";

interface DictionaryDataProps {
  word: string;
  description: string;
}

export async function loader({params}: LoaderArgs) {
  invariant(params.dictionaryId, "dictionaryId not found");
  return json({
    dictionary: await getDictionaryById({id: params.dictionaryId}),
  });
};

export default function DictionaryDetailPage () {
  const { dictionary } = useLoaderData<typeof loader>();
  const dictionaryData = useRouteData<DictionaryDataProps>("routes/dictionaries/list");
  console.log("Dictionary Data", dictionaryData)
  console.log("Dictionary Detail", dictionaryData)
  return (
    <div>
      {dictionary?.word}
      {dictionary?.description}
    </div>
  );
}