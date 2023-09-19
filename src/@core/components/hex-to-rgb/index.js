export const hexToRgb = hex => {
  // ตัดออกเครื่องหมาย # หากมี
  hex = hex.replace(/^#/, '')

  // แยกส่วน R, G, และ B
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // ส่งค่าเป็นสตริงรูปแบบ RGB
  return `{r}, ${g}, ${b}`
}
