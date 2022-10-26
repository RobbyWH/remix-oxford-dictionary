import { json } from "@remix-run/node"

export async function getJokes() {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const jokes = await response.json();
  return jokes;
}

export async function loader() {
  const jokes =  await getJokes();
  return json({
    jokes,
  }, {
    headers: {
      'Cache-Control': 'public, max-age=10, s-max-age=10, stale-while-revalidate=10',
    },
  });
};

