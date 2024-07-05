import CEditor from "@/../ckeditor5/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Editor = ({ value, onChange }: { value: string; onChange: any }) => {
  const handleChange = async (_event: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  };
  return (
    <CKEditor
      editor={CEditor}
      data={value}
      onChange={handleChange}
    />
  );
};

export default Editor;
