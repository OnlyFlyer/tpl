import * as React from 'react';
// import * as monaco from 'monaco-editor';
import { setLocaleData } from 'monaco-editor-nls';
import zh_CN from 'monaco-editor-nls/locale/zh-hans.json';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import 'monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu.js';

console.log(zh_CN, '--8');
setLocaleData(zh_CN);

const monaco = require('monaco-editor/esm/vs/editor/editor.api');

export default function Editor() {
  const editorRef = React.useRef<any>();
  const init = React.useCallback(() => {
    const root: any = document.getElementById('editorWrapper');
    editorRef.current = monaco.editor.create(root, {
      language: 'javascript',
      theme: 'vs-dark',
      readOnly: false,
      // contextmenu: false,c
      contextmenu: true,
      // autoIndent: 'keep',
      // automaticLayout: true,
      // showFoldingControls: 'always',
      // folding: true,
      // foldingStrategy: 'auto',
      // suggestFontSize: 13,
      // fontSize: 13,
      // fixedOverflowWidgets: true,
      // renderControlCharacters: true,
    });
    // editorRef.current.onContextMenu((e) => {
    //   console.log(e, 'onContextMenu');
    //   const contextMenuElement = editorRef.current?.getDomNode()?.querySelector<HTMLElement>('.monaco-menu-container');
    //   console.log(editorRef.current, '--28');

    //   if (contextMenuElement) {
    //       const posY =
    //           e.event.posy + contextMenuElement.clientHeight >
    //           window.innerHeight
    //               ? e.event.posy - contextMenuElement.clientHeight
    //               : e.event.posy;

    //       const posX =
    //           e.event.posx + contextMenuElement.clientWidth >
    //           window.innerWidth
    //               ? e.event.posx - contextMenuElement.clientWidth
    //               : e.event.posx;

    //       contextMenuElement.style.position = 'fixed';
    //       contextMenuElement.style.top =
    //           Math.max(0, Math.floor(posY)) + 'px';
    //       contextMenuElement.style.left =
    //           Math.max(0, Math.floor(posX)) + 'px';
    //   }
    // });
    // editorRef.current.onDidChangeModelContent((event) => {
    //   console.log(event, '--onDidChangeModelContent event');
    // });
  }, []);
  // @ts-ignore
  window['eeeditor'] = editorRef.current;
  React.useEffect(() => {
    init();
  }, [init]);
  return (
    <div id="editorWrapper" style={{ width: '100%', height: 1000, border: '1px dashed #eee' }} />
  );
};
