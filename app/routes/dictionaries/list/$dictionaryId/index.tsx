import * as React from 'react';
import { json } from "@remix-run/node"
import { useLoaderData, useCatch, useFetcher } from "@remix-run/react";
import { getJokes } from '~/routes/api/jokes';

export async function loader() {
  // throw new Response("What a joke! Not found.", {
  //   status: 403
  // });
  // return json({
  //   jokes: {
  //     setup: "test",
  //     punchline: "test"
  //   },
  // });
  const jokes = await getJokes()
  return json({
    jokes,
  }, {
    headers: {
      'Cache-Control': 'max-age=10',
    },
  });
};

export default function JokesDetailPage () {
  const { jokes } = useLoaderData<typeof loader>();

  // const jokesFetcher = useFetcher();
  // const jokes = (jokesFetcher?.data as any)?.jokes ?? [];

  // React.useEffect(() => {
  //   jokesFetcher.load("/api/jokes");
  // }, [])

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-center text-blue-600">Joke Of The Day</h1>
      <br/>
      <div>
        <h1 className="text-lg font-semibold text-center">{jokes?.setup}</h1>
      </div>
      <div>
        <p className="text-center">{jokes?.punchline}</p>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-5">
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <div className="p-5">
        <h1>Caught</h1>
        <p>Status: {caught.status}</p>
        <p>Message: {caught.data}</p>
      </div>
    );
  }
  throw new Error("Error is coming from Catch Boundary")
}
