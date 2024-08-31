import CodeMirror from '@uiw/react-codemirror';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { javascript } from '@codemirror/lang-javascript';

const extensions = [javascript({ jsx: true })];

const Code = ({ value }) => (
  <CodeMirror
    readOnly
    value={value}
    extensions={extensions}
    theme={noctisLilac}
  />
);

export default Code;
