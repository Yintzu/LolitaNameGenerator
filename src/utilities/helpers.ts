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
