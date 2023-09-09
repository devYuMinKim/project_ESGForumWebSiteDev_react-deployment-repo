import ReactQuill, { ReactQuillProps } from 'react-quill';
import { DeltaStatic } from 'quill';

import { modules, formats, applyConfigure } from './editor-configure';
import { useRef } from 'react';
import { uploadFile } from '../../services/upload.service';
import Attachments from './Attachments';

applyConfigure();

interface QuillEditorProps extends ReactQuillProps {}

const QuillEditor = (props: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const handleAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    const fileUrl = await uploadFile(file);
    const fileName = file.name;

    const curLen = quillRef.current?.getEditor().getLength() || 0;

    const delta = {
      ops: [{ retain: curLen }, { insert: fileName, attributes: { link: fileUrl } }],
    };

    quillRef.current?.getEditor().updateContents(delta as DeltaStatic);
  };

  return (
    <div className="flex flex-col gap-20">
      <ReactQuill {...{ ...props, modules, formats }} onChange={props.onChange} ref={quillRef} />
      <Attachments onChange={handleAttach} />
    </div>
  );
};

export default QuillEditor;
