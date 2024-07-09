import dayjs from "dayjs";
import SparkMD5 from "spark-md5";
import FileCutWorker from "@/workers/cut-file-worker?worker";
import { ByteEnum } from "#/enums/byte";
import { DateFormatEnum } from "#/enums/format";
import type { FileChunk } from "#/utils";

/**
 * 用于格式化后端提供的时间
 *
 * @param date 符合 `Dayjs` 构造函数的解析类型, 包括字符串, 毫秒值, `Date` 对象
 * @param formatter 选择日期格式, 默认为 `@enum {DateFormatEnum.YYYYMMDDHHmmss}`
 * @return 格式化后的日期
 */
export function dateFormat(
  date: string | number | Date,
  formatter: DateFormatEnum = DateFormatEnum.YYYYMMDDHHmmss,
): string {
  return dayjs(date).format(formatter);
}

/**
 * 切分大文件
 *
 * @param file 需要进行分片的文件
 * @param index 当前是第几个分片, 下标从0开始
 * @param chunkSize 分片大小
 */
export function createChunks(file: File, index: number, chunkSize: number): Promise<FileChunk> {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const blob = file.slice(start, end);
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();

    reader.onload = (e) => {
      spark.append(<ArrayBuffer>(<FileReader>e.target).result);

      resolve({
        index,
        start,
        end,
        hash: spark.end(),
        blob,
      });
    };

    reader.readAsArrayBuffer(blob);
  });
}

/**
 * 文件分片执行函数
 * @param file 需切片文件
 * @param {ByteEnum | number} chunkSize 分片大小; 推荐使用 `ByteEnum` 的整数倍为单位进行切片
 */
export async function cutFile(
  file: File,
  chunkSize: number = ByteEnum.MB,
  workers: number = navigator.hardwareConcurrency ?? 4,
): Promise<FileChunk[]> {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / chunkSize); // 分片数
    const threadChunkCount = Math.ceil(chunkCount / workers); // 每个线程分到多少个分片
    const result: FileChunk[] = [];
    let finishCount: number = 0;

    for (let i = 0; i < workers; i++) {
      // 创建一个线程，并分配任务
      const worker = new FileCutWorker();

      const start = i * threadChunkCount;
      let end = (i + 1) * threadChunkCount;
      if (end > chunkCount)
        end = chunkCount;

      worker.postMessage({
        file,
        chunkSize,
        startChunkIndex: start,
        endChunkIndex: end,
      });

      worker.onmessage = (e: MessageEvent<FileChunk[]>) => {
        for (let i = start; i < end; i++) result[i] = e.data[i - start];

        worker.terminate();
        finishCount++;

        if (finishCount === workers)
          resolve(result);
      };
    }
  });
}

/**
 * md5加密密码
 *
 * @param pwd 密码字符
 */
export function hashPassword(pwd: string) {
  return SparkMD5.hash(pwd);
}
