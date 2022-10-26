import { json } from "@remix-run/node"
import { useLoaderData, NavLink, Outlet, useFetchers } from "@remix-run/react";

import { getDictionaryList } from "~/models/dictionary.server";

type DictionaryDataProps = Awaited<ReturnType<typeof getDictionaryList>>
export type DictionariesProps = {
  dictionaries: DictionaryDataProps
}

export async function loader() {
  return json({
    dictionaries: await getDictionaryList(),
  });
};

export default function DictionaryIndexPage() {
  const { dictionaries } = useLoaderData<typeof loader>();

  // Just for the Optimistic UI
  // 1) Find my task's submissions
  const fetchers = useFetchers();
  const myFetchers = new Map();
  for (const f of fetchers) {
    if (
      f.submission &&
      f.submission.action.startsWith(
        `/dictionaries/list/admin/`
      )
    ) {
      const id = f.submission.formData.get("id") as string;
      console.log("==================================");
      console.log("INTENT", f.submission.formData.get("intent"))
      console.log("ID Fetchers", f.submission.formData.get("id"))
      console.log("Word Fetchers", f.submission.formData.get("word"))
      console.log("Desc Fetchers", f.submission.formData.get("description"))
      console.log("==================================");
      myFetchers.set(
        id,
        {
          word: f.submission.formData.get("word"),
          description: f.submission.formData.get("description"),
        }
      );
    }
  }

  // for (const dictionary of dictionaries) {
  //   // 2) use the optimistic version
  //   if (myFetchers.has(dictionary.id)) {
  //     if (myFetchers.get(dictionary.id)) {
  //       console.log("change content", myFetchers.get(dictionary.id))
  //     }
  //   }
  // }


  return (
    <div className="flex">
      <div className="h-screen bg-sky-200 p-5">
        <div className="mr-5">
          {
            dictionaries.map(dictionary => 
              <NavLink state={{dictionary}} prefetch="intent" className={({ isActive }) => isActive ? 'text-blue-900' : 'text-blue-400'} key={dictionary.word} to={dictionary.id}>
                <div className="pb-4  hover:text-blue-700">{myFetchers.has(dictionary.id) && myFetchers.get(dictionary.id).word ? myFetchers.get(dictionary.id).word : dictionary.word}</div>
              </NavLink>
            )
          }
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
