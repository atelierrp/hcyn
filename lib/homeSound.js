/** Sync bridge so mute toggles run in the same user-gesture turn as the tap. */

let applier = null;

export function registerHomeSoundApplier(fn) {
  applier = fn;
  return () => {
    if (applier === fn) applier = null;
  };
}

export function applyHomeSoundMuted(muted) {
  applier?.(muted);
}
