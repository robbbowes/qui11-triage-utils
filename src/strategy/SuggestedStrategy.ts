import type { LocatorKind } from '../locator/LocatorKind';

export interface SuggestedStrategy {
    kind: LocatorKind;
    value: string;
}
