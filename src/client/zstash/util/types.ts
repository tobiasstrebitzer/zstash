/** @noSelfInFile */

import { InventoryContainer, InventoryItem, java, KahluaTable, _instanceof_ } from '@asledgehammer/pipewrench'

interface TypeMap {
  InventoryItem: InventoryItem
  InventoryContainer: InventoryContainer
}

export function cast<K extends keyof TypeMap>(object: KahluaTable, type: K): TypeMap[K] | null {
  return _instanceof_(object, type) ? object as TypeMap[K] : null
}

export function is<K extends keyof TypeMap>(object: KahluaTable, type: K): object is TypeMap[K] {
  return _instanceof_(object, type)
}

export function map<T>(list: java.util.ArrayList<T>): T[] {
  const results: T[] = []
  for (let i = 0; i < list.size(); i += 1) {
    results.push(list.get(i))
  }
  return results
}
