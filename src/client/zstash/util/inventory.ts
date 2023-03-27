/** @noSelfInFile */

import { getWorld, InventoryItem, IsoObject, IsoPlayer } from '@asledgehammer/pipewrench'
import { is, map } from './types'

export function getObjectsNearPlayer(player: IsoPlayer, distance: number, filter: (object: IsoObject) => boolean): IsoObject[] {
  const playerPosition = player.getCurrentSquare()
  const playerX = playerPosition.getX()
  const playerY = playerPosition.getY()
  const playerZ = playerPosition.getZ()
  const worldCell = getWorld().getCell()
  const results: IsoObject[] = []
  for (let x = playerX - distance; x <= playerX + distance; x += 1) {
    for (let y = playerY - distance; y <= playerY + distance; y += 1) {
      const containerSearchSquare = worldCell.getGridSquare(x, y, playerZ)
      if (containerSearchSquare != null) {
        const objects = containerSearchSquare.getObjects()
        for (let i = 0; i < objects.size(); i += 1) {
          const object: IsoObject = objects.get(i)
          if (filter(object) === true) {
            results.push(object)
          }
        }
      }
    }
  }
  return results
}

export function getNestedItems(items: InventoryItem[]): InventoryItem[] {
  return items.reduce<InventoryItem[]>((arr, item) => {
    if (is(item, 'InventoryContainer') && item.isEquipped()) {
      getNestedItems(map(item.getInventory().getItems())).forEach((child) => { arr.push(child) })
    } else {
      arr.push(item)
    }
    return arr
  }, [])
}
