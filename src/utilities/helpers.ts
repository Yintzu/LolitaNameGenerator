import html2canvas from "html2canvas"

export const random = (seed?: string) => {
  if (!seed) return Math.random()
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    let char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  const decimalValue = (Math.abs(hash) % 1000) / 1000
  return decimalValue
}

export const copyResultToClipboardAsImage = async (
  resultRef: React.RefObject<HTMLDivElement>,
) => {
  try {
    if (!resultRef.current) return
    const div = resultRef.current.cloneNode(true) as HTMLDivElement
    div.style.paddingBottom = "55px"
    div.style.maxWidth = "600px"
    div.style.position = "absolute"
    div.style.left = "-10000px"
    div.style.borderRadius = "0px"

    document.body.appendChild(div)
    const canvas = await html2canvas(div)
    document.body.removeChild(div)

    const dataUrl = canvas.toDataURL("image/png")

    const img = new Image()
    img.src = dataUrl

    const res = await fetch(dataUrl)
    const blob = await res.blob()

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])
  } catch (err) {
    console.error("Failed to copy div to clipboard as image:", err)
  }
}
