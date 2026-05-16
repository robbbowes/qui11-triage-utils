import type { LocatorKind } from '../locator/LocatorKind';

// Healed alternatives to a broken locator, which can be used to 
// provide suggestions to the user on how to fix their locator.
export interface SuggestedStrategy {
    kind: LocatorKind;
    value: string;
}
