import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { apiService } from "src/app/api/api-service";
import { store } from "~/api/store";
import MainPage from "~/components/MainPage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let loader: LoaderFunction = async ({ request }: { request: Request }) => {

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);

   const { data } = await store.dispatch(
    apiService.endpoints.getPlanets.initiate({
      searchTerm,
      page,
    }),
  );

  // if (!data) {
  //   throw new Response('', { status: 404 });
  // }

  return data;
}


export default function Index() {
  let data = useLoaderData<typeof loader>()
  return <MainPage data={data} />

}
