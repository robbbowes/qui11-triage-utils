export default class Levenshtein {

    public static distance(a: string, b: string): number {
        const m = a.length
        const n = b.length

        if (m == 0) return n;
        if (n == 0) return m;

        let prev = Levenshtein.initRow(n);
        let curr = new Array<number>(n + 1);

        for (let i = 1; i <= m; i++) {
            curr[0] = i;
            for (let j = 1; j <= n; j++) {
                const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
                curr[j] = Math.min(
                    curr[j - 1]! + 1,
                    prev[j]! + 1,
                    prev[j - 1]! + cost
                );
            }
            [prev, curr] = [curr, prev];
        }
        return prev[n]!;
    }

    public static findClosest(
        target: string,
        candidates: readonly string[],
        opts?: { budget?: number }
    ): string | null {
        if (!target || candidates.length === 0) return null;

        const lowerTarget = target.toLowerCase();
        const budget = opts?.budget ?? Levenshtein.budgetFor(lowerTarget);
    
        let bestDist = Infinity;
        let best: string | null = null;
        let tied = false;

        for (const candidate of candidates) {
            if (!candidate) continue;
            const lowerCandidate = candidate.toLowerCase();
        
            if (lowerCandidate === lowerTarget) return null;

            const d = Levenshtein.distance(lowerTarget, lowerCandidate);
            if (d > budget) continue;

            if (d < bestDist) {
                bestDist = d;
                best = candidate;
                tied = false;
            } else if (d === bestDist) {
                tied = true;
            }
        }
        
        return tied ? null : best;
    }


    private static budgetFor(target: string): number {
        return Math.max(2, Math.ceil(target.length / 4));
    }

    private static initRow(n: number): number[] {
        const row = new Array<number>(n + 1)
        for (let i = 0; i <= n; i++) {
            row[i] = i
        }
        return row
    }


}