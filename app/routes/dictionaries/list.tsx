import { json } from "@remix-run/node"
import { useLoaderData, NavLink } from "@remix-run/react";

import { Outlet } from "@remix-run/react";
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
  return (
    <div className="flex">
      <div className="h-screen bg-sky-200 p-5">
        <div className="mr-5">
          {
            dictionaries.map(dictionary => 
              <NavLink key={dictionary.word} to={dictionary.id}>
                <div className="pb-4 text-blue-400 hover:text-blue-700">{dictionary.word}</div>
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
