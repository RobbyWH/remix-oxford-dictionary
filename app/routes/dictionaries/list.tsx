import { json } from "@remix-run/node"
import { useLoaderData, NavLink } from "@remix-run/react";

import { Outlet } from "@remix-run/react";
import { getDictionaryList } from "~/models/dictionary.server";

export async function loader() {
  return json({
    dictionaries: await getDictionaryList(),
  });
};

export default function DictionaryIndexPage() {
  const { dictionaries } = useLoaderData<typeof loader>();
  
  console.log("tesr", dictionaries);
  return (
    <div className="flex">
      <div className="h-screen bg-sky-200 p-5">
        <div className="mr-5">
          {
            dictionaries.map(dictionary => <NavLink to={dictionary.id}><div key={dictionary.word} className="pb-4 text-blue-400 hover:text-blue-700">{dictionary.word}</div></NavLink>)
          }
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
