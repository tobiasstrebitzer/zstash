/** @noSelfInFile */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inspect(name: string, value: any) {
  const kind = type(value)
  const parts: string[] = []
  parts.push(`[${name}] {${kind}}`)
  if (kind === 'table') {
    for (const key in value) {
      parts.push(` - ${key}: ${value}`)
    }
  } else if (kind === 'userdata') {
    const metatable = getmetatable(value)
    for (const key in metatable) {
      parts.push(` - ${key}: ${value}`)
    }
  } else {
    parts.push(` = ${value}`)
  }
  print(parts.join('\n'))
}
