import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import {  } from 'remix-utils';
export async function loader() {
  
  return json({
    jokes: {
      setup: "etag2",
      punchline: "etag"
    }
  })
};
export default function EtagIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      Etag PAGE
      <br/>
      <div>{data?.jokes?.setup}</div>
      <div>{data?.jokes?.punchline}</div>
    </div>
  )
}