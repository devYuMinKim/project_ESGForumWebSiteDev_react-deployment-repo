import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import QuillResizeImage from 'quill-resize-image';

import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import 'react-quill/dist/quill.snow.css';

import { uploadFile } from '../../services/upload.service';

const toolbarOptions = {
  container: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  handlers: { emoji: function () {} },
};

export const modules = {
  toolbar: toolbarOptions,

  imageUploader: {
    /**
     * upload: (file) => Promise<string>
     * @param {File} file
     * @returns
     */
    upload: (file) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //TEST:
          uploadFile(file).then((url) => resolve(url));
        }, 1000);
      });
    },
  },

  resize: {
    locale: {},
  },
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
