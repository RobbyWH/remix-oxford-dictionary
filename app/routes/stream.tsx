import * as React from 'react';
import { defer } from "@remix-run/node";
import { useLoaderData, useCatch, Await } from "@remix-run/react";
import { getJokes } from './api/jokes';
import { v4 as uuidv4 } from 'uuid';

export async function loader() {
  const uuid = uuidv4();
  const test = {
    setup: `test fast response : ${uuid}`,
    punchline: "test"
  };
  const jokes = getJokes();
  return defer({
    jokes,
    test
  });
};

export default function StreamPage () {
  const { jokes, test } = useLoaderData<typeof loader>();
  console.log("Stream", jokes, test)
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-center text-blue-600">Joke Of The Day</h1>
      <br/>
      <div>TEST: {test.setup}</div>
      <React.Suspense fallback={<p>Suspense Fallback</p>}>
        <Await
          resolve={jokes}
          errorElement={
            <div className="relative h-full">
              <p>Error</p>
            </div>
          }
        >
          {(joke) => (
            <div>
              <div>
                <h1 className="text-lg font-semibold text-center">{joke?.setup}</h1>
              </div>
              <div>
                <p className="text-center">{joke?.punchline}</p>
              </div>
            </div>
          )}
        </Await>
      </React.Suspense>

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
