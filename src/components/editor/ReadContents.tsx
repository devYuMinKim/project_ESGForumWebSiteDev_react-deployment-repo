import ReactQuill, { ReactQuillProps } from 'react-quill';

import { modules, formats, applyConfigure } from './read-configure';

applyConfigure();

interface QuillEditorProps extends ReactQuillProps {}

const ReadContents = (props: QuillEditorProps) => {
  return (
    <div className="flex flex-col gap-20">
      <ReactQuill {...{ ...props, modules, formats }} value={props.value} readOnly />
    </div>
  );
};

export default ReadContents;
