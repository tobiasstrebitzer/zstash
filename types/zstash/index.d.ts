/** @noResolution */

import { InventoryItem, IsoObject, IsoPlayer } from '@asledgehammer/pipewrench'

export { }

declare global {
  class ISConfigureContainerWindow {
    static getStoredUUID(player: IsoPlayer, key: string, bool: boolean): string
    /** @noSelf */
    static getContainerData(container: IsoObject, playerUUID: string, containerIndex: number): unknown
  }

  class ISInventoryPaneContextMenu {
    /** @noSelf */
    static TransferItems(items: InventoryItem[], playerNum: number, unrestricted: boolean, objects: IsoObject[]): number
  }

  interface ModOptionsKeyBinding {
    name: string
    key: number
  }

  class ModOptions {
    static AddKeyBinding(name: string, keyBinding: ModOptionsKeyBinding): void
  }

  const SandboxVars: {
    ZStash: {
      Distance: number
    }
  }
}
