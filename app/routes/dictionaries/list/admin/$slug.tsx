import * as React from "react";
import { Form, useActionData, useLoaderData, useTransition, useFetcher, useParams } from "@remix-run/react";
import { type ActionArgs, redirect, json, type LoaderArgs } from "@remix-run/node"
import { createDictionary, getDictionaryById, deleteDictionaryById, updateDictionaryById } from "~/models/dictionary.server";
import invariant from "tiny-invariant";
import { v4 as uuidv4 } from 'uuid';


export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "slug not found");
  if (params.slug === "new") {
    return json({ dictionary: null });
  }

  const dictionary = await getDictionaryById({id: params.slug});
  invariant(dictionary, `Dictionary not found: ${params.slug}`);
  return json({ dictionary });
}


export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const word = formData.get("word") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  invariant(typeof params.slug === "string", "slug not provided");

  if (intent === "delete") {
    await deleteDictionaryById({id: params.slug});
    return redirect("/dictionaries/list");
  }

  const errors = {
    word: word ? null : "Word is required",
    description: description ? null : "Description is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json({
      errors,
      status: 400
    });
  }
    
  invariant(typeof word === "string", "Word must be a string");
  invariant(typeof description === "string", "Description must be a string");

  if (params.slug === "new") {
    const uuid = uuidv4();;
    await createDictionary({ word, description, id: uuid });
    return redirect(`/dictionaries/list/${uuid}`);
  } else {
    await updateDictionaryById({ id, description, word })
    return redirect(`/dictionaries/list/${id}`);
  }
};

export default function NewDictionaryPage() {
  const data = useLoaderData<typeof loader>();
  const {slug} = useParams();

  // only working with Form
  // const actionData = useActionData<typeof action>(); 

  const wordRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const formRef = React.useRef<any>(null);

  const dictionaryFetcher = useFetcher()
  const actionData = dictionaryFetcher.data;
  const isCreating = dictionaryFetcher.submission?.formData.get("intent") === "create";
  const isUpdating = dictionaryFetcher.submission?.formData.get("intent") === "update";
  const isDeleting = dictionaryFetcher.submission?.formData.get("intent") === "delete";
  const word = dictionaryFetcher.submission?.formData.get("word") as string;
  const description = dictionaryFetcher.submission?.formData.get("description") as string;
  console.log("WORD", word, description)

  // const transition = useTransition();
  // const isCreating = transition.submission?.formData.get("intent") === "create";
  // const isUpdating = transition.submission?.formData.get("intent") === "update";
  // const isDeleting = transition.submission?.formData.get("intent") === "delete";
  // const word = transition.submission?.formData.get("word");
  // const description = transition.submission?.formData.get("description") as string;
  // console.log("WORD", word, description)

  React.useEffect(() => {
    if (!formRef.current) return;
    if (dictionaryFetcher.state !== "idle") return;

    const formEl = formRef.current;

    if (actionData?.errors?.word) {
      formEl.elements.word?.focus();
    } else if (actionData?.errors?.description) {
      formEl.elements.description?.focus();
    } else if (document.activeElement === formEl.elements.intent) {
      alert("Test")
      formEl.reset();
      formEl.elements.word?.focus();
    }
  }, [dictionaryFetcher.state, actionData?.errors?.word]);

  const isNewDictionary = !data.dictionary;

  return (
    <div className="p-5">
      <dictionaryFetcher.Form
        method="post"
        ref={formRef}
        noValidate
      >
        <input hidden name="id" defaultValue={slug} />
        <div className="mb-5">
          <label className="flex w-full flex-col gap-1">
            <span>Word: </span>
            <input
              ref={wordRef}
              defaultValue={data?.dictionary?.word}
              name="word"
              className="flex-1 rounded-md border-2 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.word ? true : undefined}
              aria-errormessage={
                actionData?.errors?.word ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.word && (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.word}
            </div>
          )}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Description: </span>
            <textarea
              ref={descriptionRef}
              defaultValue={data?.dictionary?.description}
              name="description"
              rows={8}
              className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
              aria-invalid={actionData?.errors?.description ? true : undefined}
              aria-errormessage={
                actionData?.errors?.description ? "body-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.description && (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.description}
            </div>
          )}
        </div>

        <div className="flex gap-8 mt-10">
        {!isNewDictionary && (
          <button
            type="submit"
            name="intent"
            value="delete"
            className="flex-1 rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          type="submit"
          name="intent"
          value={isNewDictionary ? "create" : "update"}
          className="flex-1 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating || isUpdating}
        >
          {isNewDictionary ? (isCreating ? "Creating..." : "Create") : null}
          {isNewDictionary ? null : isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
      </dictionaryFetcher.Form>
      
      <p>Optimistic Update</p>
      <p>Word : {word}</p>
      <p>Description : {description}</p>
    </div>
  );
}