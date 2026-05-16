export class HtmlPreparer {

    public static prepare(html: string): string {
        return HtmlPreparer
            .stripNoise(html)
            .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/\ssrc="data:image\/[^"]{20,}"/gi, '')
            .replace(/\sstyle="[^"]{80,}"/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    private static stripNoise(html: string): string {
        return html.replace(/\snghost-[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\s_ngcontent-[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\sdata-react[a-z0-9-]+="[^"]*"/gi, '')
            .replace(/\b(css|sc)-[a-z0-9]{6,}\b/g, '');
    }


}
