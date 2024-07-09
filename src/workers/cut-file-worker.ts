import { createChunks } from "@/utils";
import type { FileChunk, FileCutMessage } from "#/utils";

onmessage = async (e: MessageEvent<FileCutMessage>) => {
  const {
    file,
    chunkSize,
    startChunkIndex: start,
    endChunkIndex: end,
  } = e.data;
  const proms: Promise<FileChunk>[] = [];

  for (let i = start; i < end; i++)
    proms.push(createChunks(file, i, chunkSize));

  const chunks = await Promise.all(proms);
  postMessage(chunks);
};
