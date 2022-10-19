import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData, useCatch } from "@remix-run/react";

export async function loader({params}: LoaderArgs) {
  throw new Response("What a joke! Not found.", {
    status: 403
  });
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const jokes = await response.json();
  return json({
    jokes,
  });
};

export default function JokesDetailPage () {
  const { jokes } = useLoaderData<typeof loader>();
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
