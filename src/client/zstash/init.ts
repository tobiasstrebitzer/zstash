/** @noSelfInFile */

import { onKeyPressed } from '@asledgehammer/pipewrench-events'
import { onKeyPressedListener } from './listeners/onKeyPressed'

onKeyPressed.addListener(onKeyPressedListener)
