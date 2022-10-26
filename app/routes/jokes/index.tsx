import * as React from 'react';
import { useFetcher, useOutletContext, Outlet } from "@remix-run/react";
import { useRouteData } from "remix-utils";

export default function JokesIndexPage() {
  const fetcher = useFetcher();
  const jokesRoute = useRouteData<any>("routes/jokes");
  const { jokes } = useOutletContext<any>();

  React.useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/jokes");
    }
  }, [fetcher]);

  return (
    <div>
      <b>Jokes Child Page : useFetcher load</b>
      <div>{fetcher?.data?.jokes?.setup}</div>
      <div>{fetcher?.data?.jokes?.punchline}</div>
      <hr />
      <b>Jokes Child Page : Use Route Data</b>
      <div>{jokesRoute?.jokes?.setup}</div>
      <div>{jokesRoute?.jokes?.punchline}</div>
      <hr />
      <b>Jokes Child Page : useOutletContext</b>
      <div>{jokes?.setup}</div>
      <div>{jokes?.punchline}</div>
    </div>
  )
}