import { ComponentPropsWithRef, Dispatch, RefObject, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface FileInputProps extends ComponentPropsWithRef<"input"> {
  selectedFiles: File[] | null;
  setSelectedFiles: Dispatch<File[]>;
  refs?: RefObject<HTMLInputElement>;
  className?: string;
}

export default function FileInput(props: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null) || props.refs;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);

    props.setSelectedFiles(files);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-4 flex flex-col items-center gap-2 bg-white text-[#5091F8] hover:bg-[#7A92FC1A] rounded-lg cursor-pointer w-full ${
        props.className && props.className
      }`}
    >
      <AiOutlineCloudUpload className="w-6 h-6" />
      <span>Choose .HEIC images to upload</span>
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleChange} accept=".heic" />
      {!!props.selectedFiles?.length && (
        <div className="p-4 mt-4 white overflow-hidden text-ellipsis max-w-[80%]">
          <p>Selected Files:</p>
          {props.selectedFiles?.map((file, i) => {
            return (
              <span key={i} className="text-[#F49462] whitespace-nowrap italic">
                {file.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
