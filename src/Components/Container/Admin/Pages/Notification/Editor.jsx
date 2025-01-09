import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import { useState } from "react";
import { Typography } from "@mui/material";

const EditorJs = ({
  value,
  setFieldValue,
  readOnly = false,
  placeholder = "Write your message here...",
  errors = null,
  required = true,
}) => {
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    return EditorState.createWithContent(contentState);
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'textAlign',
            'list',
            'colorPicker',
            'link',
            // 'embedded',
            'emoji',
            'image',
            // 'remove',
            'history',
          ],
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
          fontFamily: {
            options: [
              'Arial',
              'Georgia',
              'Impact',
              'Tahoma',
              'Times New Roman',
              'Verdana',
            ],
          },
        }}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {typeof value === "undefined" && errors ? (
        <Typography
          color="error"
          variant="body2"
          sx={{ margin: "0px", padding: "0px" }}
        >
          {errors}
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditorJs;