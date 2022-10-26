import * as React from 'react';
import { useFetcher } from "@remix-run/react";

export default function JokesIndexPage() {
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/jokes");
    }
  }, [fetcher?.type]);

  return (
    <div>
      TEST PAGE
      <br/>
      <div>{fetcher?.data?.jokes?.setup}</div>
      <div>{fetcher?.data?.jokes?.punchline}</div>
    </div>
  )
}