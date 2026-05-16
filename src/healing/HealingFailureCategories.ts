export type HealingFailureCategories =
    | 'no-suggestion'
    | 'llm-error'
    | 'cache-corrupt'
    | 'cache-write-failed'
    | 'parse-failed'
    | 'heal-attempt-failed'
    