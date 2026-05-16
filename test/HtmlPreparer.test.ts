import { describe, it, expect } from 'vitest';
import { HtmlPreparer } from '../src/llm/HtmlPreparer';

describe('HtmlPreparer.prepare', () => {

    describe('HtmlPreparer.prepare strips script blocks', () => {

        it('strips script blocks and their contents', () => {
            const html = '<div>Content before</div><script>alert("This should be removed");</script><div>Content after</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Content before</div><div>Content after</div>');
        });

        it('handles multiple script blocks', () => {
            const html = '<div>Start</div><script>console.log("First script");</script><div>Middle</div><script>console.log("Second script");</script><div>End</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Start</div><div>Middle</div><div>End</div>');
        });

        it('handles no script blocks', () => {
            const html = '<div>No scripts here!</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>No scripts here!</div>');
        });

        it('handles script blocks with attributes', () => {
            const html = '<div>Before</div><script type="text/javascript">console.log("Script with attributes");</script><div>After</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Before</div><div>After</div>');
        });

    });

    describe('HtmlPreparer.prepare strips style blocks', () => {

        it('strips style blocks and their contents', () => {
            const html = '<div>Content before</div><style>.hidden { display: none; }</style><div>Content after</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Content before</div><div>Content after</div>');
        });

        it('handles multiple style blocks', () => {
            const html = '<div>Start</div><style>.first { color: red; }</style><div>Middle</div><style>.second { color: blue; }</style><div>End</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Start</div><div>Middle</div><div>End</div>');
        });

        it('handles no style blocks', () => {
            const html = '<div>No styles here!</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>No styles here!</div>');
        });

        it('handles style blocks with attributes', () => {
            const html = '<div>Before</div><style type="text/css">.styled { font-size: 16px; }</style><div>After</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Before</div><div>After</div>');
        });

    });

    describe('HtmlPreparer.prepare strips comment blocks', () => {

        it('strips comment blocks', () => {
            const html = '<div>Content before</div><!-- This is a comment --><div>Content after</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Content before</div><div>Content after</div>');
        });

        it('handles multiple comment blocks', () => {
            const html = '<div>Start</div><!-- First comment --><div>Middle</div><!-- Second comment --><div>End</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Start</div><div>Middle</div><div>End</div>');
        });

        it('handles no comment blocks', () => {
            const html = '<div>No comments here!</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>No comments here!</div>');
        });
        
    })

    describe('HtmlPreparer.prepare collapses whitespace', () => {

        it('collapses multiple spaces into a single space', () => {
            const html = '<div>   This    is   a   test.   </div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div> This is a test. </div>');
        });

        it('collapses tabs and newlines into spaces', () => {
            const html = '<div>\tThis is a test.\nNew line here.\t</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div> This is a test. New line here. </div>');
        });

        it('handles no extra whitespace', () => {
            const html = '<div>This is a test.</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>This is a test.</div>');
        });

    });

    describe('HtmlPreparer.prepare strips noise', () => {

        it('strips Angular nghost and ngcontent attributes', () => {
            const html = '<div nghost-abc123="" _ngcontent-def456="">Content</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Content</div>');
        });

        it('strips React data-react attributes', () => {
            const html = '<div data-reactroot="" data-reactid="1" data-react-checksum="abc123">Content</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Content</div>');
        });

    });

    describe('HtmlPreparer.prepare strips long data URIs and styles', () => {

        it('strips long data URIs in src attributes', () => {
            const html = '<div>Before</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" alt="Image"/><div>After</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Before</div><img alt="Image"/><div>After</div>');
        });

        it('strips long inline styles', () => {
            const html = '<div style="color: red; font-size: 16px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA);">Styled content</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Styled content</div>');
        });

    });

    describe('HtmlPreparer.prepare truncates at max length on a tag boundary', () => {

        it('truncates long HTML at a tag boundary', () => {
            const html = '<div>'.repeat(12_100);
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared.length).toBeLessThan(html.length);
            expect(prepared.endsWith('>') || prepared.endsWith('truncated -->')).toBe(true);
        });

        it('does not truncate if under max length', () => {
            const html = '<div>Short content</div>';
            const prepared = HtmlPreparer.prepare(html);
            expect(prepared).toBe('<div>Short content</div>');
        });

    });

});