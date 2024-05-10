import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

//

const RichEditors = () => {
  const [text, setText] = useState("");

  return (
    <div className="textarea">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
      <div className="textarea-box">
        <h2 className="box-heading">Description Output</h2>
        {parse(text)}
      </div>
    </div>
  );
};

export default RichEditors;
