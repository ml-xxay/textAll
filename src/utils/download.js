import axios from 'axios'

/**
 * 分片下载大文件
 * @param {string} fileUrl 文件地址
 * @param {number} chunkSize 每个分片大小（字节）
 * @param {function} onProgress 进度回调
 * @returns {Promise<Blob>} 合并后的完整 Blob
 */

export async function downloadFileInChunks(fileUrl, chunkSize, onProgress) { 
  // 1. 先获取文件总大小（通过 HEAD 请求）
  const headResponse = await axios.head(fileUrl)
  const totalSize = parseInt(headResponse.headers['content-length'], 10)

  // 2. 计算需要多少个分片
  const chunksCount = Math.ceil(totalSize / chunkSize)  //跟据文件大小来计算分片数

  // 3. 并发下载所有分片（并发数建议 3~5）
  const chunkPromises = []
  const blobs = []

  for (let i = 0; i < chunksCount; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize - 1, totalSize - 1)

    // 把每个分片请求包装成 promise
    chunkPromises.push(
      fetchChunk(fileUrl, start, end).then((blob) => {
        console.log('每次请求', blob)

        blobs[i] = blob // 按原始索引保存，保证顺序
      })
    )
  }

  // 4. 并发执行所有分片下载
  await Promise.all(chunkPromises)

  // 5. 所有分片下载完成后合并成一个完整的 Blob
  return new Blob(blobs)
}

/**
 * 下载单个分片
 * @param {string} fileUrl 文件地址
 * @param {number} start 起始字节
 * @param {number} end 结束字节
 * @returns {Promise<Blob>} 分片数据
 */
async function fetchChunk(fileUrl, start, end) {
  const response = await axios.get(fileUrl, {
    headers: {
      // 请求特定范围的字节
      Range: `bytes=${start}-${end}`,
    },
    responseType: 'arraybuffer', // 返回 Blob 类型
  })

  console.log(response, '我是分片响应')

  return response.data
}
