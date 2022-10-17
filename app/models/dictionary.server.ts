import type { Dictionary } from "@prisma/client";

import { prisma } from "~/db.server";
export function createDictionary({
  word,
  description,
}: Pick<Dictionary, "word" | "description">) {
  return prisma.dictionary.create({
    data: {
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