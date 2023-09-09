import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import QuillResizeImage from 'quill-resize-image';

import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import 'react-quill/dist/quill.snow.css';

import { uploadFile } from '../../services/upload.service';

export const modules = {
  toolbar: false,
};

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'font',
  'link',
  'image',
  'code-block',
  'script',
  'background',
  'color',
  'clean',
  'align',
  'imageBlot', // #5 Optinal if using custom formats
];

export function applyConfigure() {
  Quill.register('modules/imageUploader', ImageUploader);
  Quill.register('modules/resize', QuillResizeImage);
}
