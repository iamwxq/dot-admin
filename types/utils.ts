export interface FileChunk {
  start: number;
  end: number;
  index: number;
  hash: string;
  blob: Blob;
}

export interface FileCutMessage {
  file: File;
  chunkSize: number;
  startChunkIndex: number;
  endChunkIndex: number;
}
