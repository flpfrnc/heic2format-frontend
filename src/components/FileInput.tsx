import { ComponentPropsWithRef, Dispatch, RefObject, useRef } from "react";

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
      className={`relative px-6 py-4 flex flex-col items-start gap-2 bg-white text-black hover:bg-[#7A92FC1A] rounded-lg cursor-pointer w-full ${
        props.className && props.className
      }`}
    >
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleChange} accept=".heic" />
      {!!props.selectedFiles?.length ? (
        <div className="white overflow-hidden text-ellipsis max-w-[80%] text-sm">
          <p>SELECTED</p>
          {props.selectedFiles?.map((file, i) => {
            return (
              <span key={i} className="text-[#A8A8A8] whitespace-nowrap italic">
                {file.name}
              </span>
            );
          })}
        </div>
      ) : (
        <span>Select any images to convert</span>
      )}
    </div>
  );
}
