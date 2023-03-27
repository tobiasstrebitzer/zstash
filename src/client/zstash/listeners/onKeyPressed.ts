/** @noSelfInFile */

import { getPlayer, Keyboard } from '@asledgehammer/pipewrench'
import { OnKeyPressedListener } from '@asledgehammer/pipewrench-events'
import { getNestedItems, getObjectsNearPlayer } from '../util/inventory'
import { map } from '../util/types'

const QuickStashKey = { name: 'ZSTASH_HOTKEY', key: Keyboard.KEY_SLASH }

if (ModOptions?.AddKeyBinding != null) {
  ModOptions.AddKeyBinding('[Hotkeys]', QuickStashKey)
}

export const onKeyPressedListener: OnKeyPressedListener = (key) => {
  if (key !== Keyboard.KEY_SLASH) { return }
  const player = getPlayer()
  const items = getNestedItems(map(player.getInventory().getItems())).filter((item) => !item.isFavorite() && !item.isEquipped())
  const objects = getObjectsNearPlayer(player, 8, (entry) => entry.getContainer() != null && !entry.isZombie() && entry.getItemContainer().isExplored())
  if (items.length === 0) {
    player.addLineChatElement('I\'ve got no items to stash!', 1, 0.35, 0.35)
    return
  }
  const stashCount = ISInventoryPaneContextMenu.TransferItems(items, player.getPlayerNum(), false, objects)
  if (stashCount === 0) {
    player.addLineChatElement('There are no containers nearby!', 1, 0.35, 0.35)
  } else {
    player.addLineChatElement(`Stashing ${stashCount} ${stashCount > 1 ? 'items' : 'item'}!`, 0.75, 0.9, 0.65)
  }
}
