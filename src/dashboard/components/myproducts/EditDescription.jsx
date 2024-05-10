import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//

const EditDescription = ({ handleEditor, value }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handleEditor}
      data={value}
      config={{
        placeholder: "Start typing your product description here...",
        toolbar: [
          "Heading",
          "|",
          "Bold",
          "Italic",
          "Link",
          "NumberedList",
          "BulletedList",
          "|",
          "BlockQuote",
          "MediaEmbed",
          "Undo",
          "Redo",
        ],
      }}
    />
  );
};

export default EditDescription;
