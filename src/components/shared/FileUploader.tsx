import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaURL: string;
};

const FileUploader = ({ fieldChange, mediaURL }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileURL, setFileURL] = useState(mediaURL);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log(acceptedFiles);

      setFile(acceptedFiles);
      setFileURL(URL.createObjectURL(acceptedFiles[0]));
      fieldChange(acceptedFiles);
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} />
      {fileURL ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileURL} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={77} />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag Photo here or Click to Select a File
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG , PNG , JPG</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
