import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader() {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const jokes = await response.json();
  return json({
    jokes,
  }, {
    headers: {
      'Cache-Control': 'max-age=10',
    },
  });
};


export default function JokesPage () {
  const {jokes} = useLoaderData<typeof loader>()
  return (
    <div>
      <b>Jokes Parent Page</b>
      <div>{jokes.setup}</div>
      <div>{jokes.punchline}</div>
      <hr />
      <Outlet context={{jokes}} />
    </div>
  );
}