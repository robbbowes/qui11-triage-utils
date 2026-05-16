// Using an array rather than a single string to merge
// all possible alternatives for a particular locator 
type Suggestions = string[];

// Resolve using playwrights getByXXX factory methods
export interface CacheFactories {
    role?: Suggestions;
    placeholder?: Suggestions;
    text?: Suggestions;
    label?: Suggestions;
    altText?: Suggestions;
    title?: Suggestions;
    testid?: Suggestions;
}

// Resolve using locator('css=...') or similar
export interface CacheSelectors {
    id?: Suggestions;
    xpath?: Suggestions;
    css?: Suggestions;
    name?: Suggestions;
    class?: Suggestions;
    linktext?: Suggestions;
}

// An entry into the cache for a particular locator
export interface CacheEntry {
    factories?: CacheFactories;
    selectors?: CacheSelectors;
    updatedAt: string; // ISO string of when this cache entry was last updated
}

export interface CacheFile {
    version: number; // Schema version of the cache file, for future compatibility
    entries: Record<string, CacheEntry>;
}