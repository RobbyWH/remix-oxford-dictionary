import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData, useParams, Outlet, Link, useTransition } from "@remix-run/react";
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
  const transition = useTransition();
  const showLoading = transition.state !== "idle";
  // const dictionaryData = useRouteData<DictionariesProps>("routes/dictionaries/list");
  const {dictionaryId} = useParams();

  let loadingDictionary;
  if(transition.location?.state) {
    loadingDictionary = (transition.location.state as any).dictionary;
  }
  const showSkeleton = Boolean(loadingDictionary)
  console.log("LOADING DICTIONARY", loadingDictionary)
  console.log("showSkeleton", showSkeleton)
  return (
    <div className="p-5">
      {showLoading ? <div>Loading</div> : null}
      {showSkeleton ? <div>Skeleton: {loadingDictionary?.word}</div> : (
        <div>
          <div className="p-5">
            <div className="flex">
              <h1 className="text-lg font-semibold mr-10">{dictionary?.word}</h1>
              <Link to={`../admin/${dictionaryId}`} className="text-blue-500 underline">
                <span className="material-icons blueSky">edit</span>
              </Link>
            </div>
            <div>
              <p>{dictionary?.description}</p>
            </div>
          </div>
          <hr/>
          <Outlet />
        </div>
      )}
    </div>
  );
}
