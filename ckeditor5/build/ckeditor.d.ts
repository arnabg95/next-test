/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { FullPage, GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { AutoImage, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { LegacyList, LegacyListProperties } from '@ckeditor/ckeditor5-list';
import { MediaEmbed, MediaEmbedToolbar } from '@ckeditor/ckeditor5-media-embed';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersText } from '@ckeditor/ckeditor5-special-characters';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof Alignment | typeof AutoImage | typeof AutoLink | typeof Autoformat | typeof Base64UploadAdapter | typeof BlockQuote | typeof Bold | typeof Code | typeof CodeBlock | typeof Essentials | typeof FontBackgroundColor | typeof FontColor | typeof FontFamily | typeof FontSize | typeof FullPage | typeof GeneralHtmlSupport | typeof Highlight | typeof HorizontalLine | typeof HtmlEmbed | typeof Image | typeof ImageCaption | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Italic | typeof LegacyList | typeof LegacyListProperties | typeof Link | typeof LinkImage | typeof MediaEmbed | typeof MediaEmbedToolbar | typeof PageBreak | typeof Paragraph | typeof PasteFromOffice | typeof RemoveFormat | typeof SelectAll | typeof ShowBlocks | typeof SourceEditing | typeof SpecialCharacters | typeof SpecialCharactersArrows | typeof SpecialCharactersCurrency | typeof SpecialCharactersEssentials | typeof SpecialCharactersText | typeof Strikethrough | typeof Subscript | typeof Superscript | typeof TextTransformation | typeof Underline | typeof Undo | typeof WordCount)[];
    static defaultConfig: EditorConfig;
}
export default Editor;
