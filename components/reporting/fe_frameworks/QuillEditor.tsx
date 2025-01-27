import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = forwardRef((props, ref) => (
  <ReactQuill {...props} ref={ref} />
));

export default QuillEditor;
