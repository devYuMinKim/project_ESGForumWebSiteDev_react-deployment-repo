import ReactQuill, { ReactQuillProps } from 'react-quill';

import { modules, formats, applyConfigure } from './configure';

applyConfigure();

interface QuillEditorProps extends ReactQuillProps {}

const QuillEditor = (props: QuillEditorProps) => {
  return <ReactQuill {...{ ...props, modules, formats }} />;
};

export default QuillEditor;
