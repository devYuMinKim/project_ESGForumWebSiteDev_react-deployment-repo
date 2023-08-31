import ReactQuill, { ReactQuillProps } from 'react-quill';

import { modules, formats, applyConfigure } from './configure';
import { useRef, useState } from 'react';
import { uploadFile } from '../../services/upload.service';
import Attachments from './Attachments';

applyConfigure();

interface QuillEditorProps extends ReactQuillProps {}

const QuillEditor = (props: QuillEditorProps) => {
  const [contents, setContents] = useState<string>('');
  const quillRef = useRef<ReactQuill>(null);
  const handleAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    const fileUrl = await uploadFile(file);
    const fileName = file.name;

    quillRef.current?.getEditor().insertText(-1, fileName + ' ', 'link', fileUrl);
  };

  return (
    <>
      <ReactQuill {...{ ...props, modules, formats }} onChange={setContents} ref={quillRef} />
      <Attachments onChange={handleAttach} />
    </>
  );
};

export default QuillEditor;
