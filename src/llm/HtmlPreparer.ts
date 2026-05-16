export class HtmlPreparer {

    private static MAX_LENGTH = 60_000; // ~15k tokens

    public static prepare(html: string): string {
        return HtmlPreparer.truncate(
            HtmlPreparer
                .stripNoise(html)
                .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<!--[\s\S]*?-->/g, '')
                .replace(/\ssrc="data:image\/[^"]{20,}"/gi, '')
                .replace(/\sstyle="[^"]{80,}"/gi, '')
                .replace(/\s+/g, ' ')
                .trim()
        );
    }

    private static stripNoise(html: string): string {
        return html.replace(/\snghost-[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\s_ngcontent-[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\sdata-react[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\b(css|sc)-[a-z0-9]{6,}\b/g, '');
    }

    private static truncate(html: string): string {
        if (html.length <= HtmlPreparer.MAX_LENGTH) {
            return html;
        }
        // Truncate at the last tag boundary before the max length
        const truncated = html.slice(0, HtmlPreparer.MAX_LENGTH);
        const lastTagBoundary = truncated.lastIndexOf('>');
        if (lastTagBoundary > 0) {
            return truncated.slice(0, lastTagBoundary + 1) + '<!-- truncated -->';
        }
        return truncated + '<!-- truncated -->';
    }

}
