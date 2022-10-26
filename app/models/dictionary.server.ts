import type { Dictionary } from "@prisma/client";

import { prisma } from "~/db.server";
export function createDictionary({
  id,
  word,
  description,
}: Pick<Dictionary, "id" | "word" | "description">) {
  return prisma.dictionary.create({
    data: {
      id,
      word,
      description,
    },
  });
}

export function getDictionaryList() {
  return prisma.dictionary.findMany({
    select: { id: true, word: true, description: true },
    orderBy: { word: "asc" },
  });
}

export function getDictionaryById({
  id,
}: Pick<Dictionary, "id">) {
  return prisma.dictionary.findFirst({
    select: { id: true, word: true, description: true },
    where: { id },
  });
}

export function deleteDictionaryById({
  id,
}: Pick<Dictionary, "id">) {
  return prisma.dictionary.deleteMany({
    where: { id },
  });
}

export function updateDictionaryById({
  id,
  description,
  word,
}: Pick<Dictionary, "id" | "description" | "word">) {
  return prisma.dictionary.update({
    where: {
      id,
    },
    data: {
      description,
      word
    },
  })
}
