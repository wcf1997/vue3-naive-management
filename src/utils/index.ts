export function useDebounce(fn: (...args: any) => any, delay = 300) {
  let timer: number
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

export function useThrottle(fn: (...args: any) => any, delay = 300) {
  let timer: any
  return (...args: any) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

/** 利用canvas图片转换成base64 */
export function getBase64Image(img: HTMLImageElement) {
  // const timestamp = new Date().getTime()
  // img.setAttribute('crossOrigin', 'anonymous')
  // img.src = img.src + '?' + timestamp
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const dataURL = canvas.toDataURL('image/png')
  canvas.remove()
  return dataURL
  // return dataURL.replace("data:image/png;base64,", "");
}

export async function arraybuffToBase64(data: any) {
  const base64url: any = await new Promise((r) => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result)
    reader.readAsDataURL(new Blob([data]))
  })

  return base64url.split(',', 2)[1]
}

export function getMonthFrist(timestamp: any) {
  const date = timestamp ? new Date(timestamp) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  return Number(new Date(year, month, 1)) * 1
}
export function getMonthLast(timestamp: any) {
  const date = timestamp ? new Date(timestamp) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  // day为0表示获取上一个月最后一天，所以month+1
  // 86300表示一天秒数，最后日期为 23:59:59
  return (Number(new Date(year, month + 1, 0)) / 1000 + 86399) * 1000
}
