import { useState } from "react";
import FileInput from "./FileInput";
import Spinner from "./Spinner";
import heic2any from "heic2any";

export default function Home() {
  const [image, setImage] = useState<File[] | null>(null);
  const [formattedImage, setFormattedImage] = useState({ fileUrl: "", fileName: "", loading: false });
  const [toFormat, setToFormat] = useState("jpeg");

  function downloadImageFile(url: string, fileName: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  }

  async function formatFile(file: File[] | null) {
    if (!file) return;

    const blob = file?.[0];
    try {
      setFormattedImage({ ...formattedImage, loading: true });
      heic2any({
        blob: blob,
        toType: `image/${toFormat}`,
      }).then(function (resultBlob) {
        var url = Array.isArray(resultBlob) ? window.URL.createObjectURL(resultBlob[0]) : window.URL.createObjectURL(resultBlob);

        const updatedFileName = blob.name + `.${toFormat}`;

        setFormattedImage({ fileUrl: url, fileName: updatedFileName, loading: false });
        setImage(null);
      });
    } catch (error) {
      console.error(error);
      alert("Image convertion failed");
      setFormattedImage({ ...formattedImage, loading: false });
      setImage(null);
    }
  }

  return (
    <>
      <section className="w-full flex flex-col justify-start items-start py-10 sm:px-0 xl:px-20">
        <div className="flex flex-col px-14 md:px-32 w-fit">
          <span className="text-black font-bold text-[30px] sm:text-[30px] md:text-[70px] xl:text-[70px] leading-[1]">HEIC2Format</span>
          <span>Convert your images from .HEIC to .JPEG and .PNG</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center px-8 sm:px-8 md:px-32 min-w-full md:min-w-[300px] py-16">
          <div className="bg-white rounded-lg min-h-fit w-[300px] sm:max-w-[300px] md:max-w-[416px] sm:w-[300px] md:w-[416px] shadow-2xl flex flex-col justify-center items-center ">
            <FileInput selectedFiles={image} setSelectedFiles={setImage} className="w-[256px] sm:w-[256px] md:w-[416px]" />
            <hr className="w-full" />
            <div className="w-full flex">
              <select
                className="px-4 py-2 outline-none border-none active:rounded-none rounded-b-lg w-fit h-full text-center bg-white hover:bg-gray-100 cursor-pointer font-bold italic text-black"
                value={toFormat}
                onChange={(e) => setToFormat(e.target.value)}
              >
                <option value="jpeg">{"JPEG"}</option>
                <option value="png">{"PNG"}</option>
              </select>
              <div className="w-full flex justify-end items-center px-6">{image && image[0]?.name.replace("HEIC", toFormat)}</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-col md:flex-row gap-8">
            {formattedImage.loading ? (
              <Spinner />
            ) : (
              <button
                onClick={() => formatFile(image)}
                disabled={!image}
                className="bg-[#F49462] hover:bg-[#d97037] active:bg-[#F49462E6] disabled:bg-gray-400 text-white px text-lg italic shadow-lg py-2 px-6 rounded-lg"
              >
                Convert Image
              </button>
            )}
            <button
              onClick={() => downloadImageFile(formattedImage.fileUrl, formattedImage.fileName)}
              className={`no-underline bg-[#172767] hover:bg-[#161E3EF2] active:bg-[#223a9a] text-white px text-lg italic shadow-lg py-2 px-6 rounded-lg ${
                !formattedImage && "pointer-events-none bg-gray-400"
              }`}
            >
              Download last image
            </button>
          </div>
        </div>
      </section>
      <section className="w-full bg-white min-h-[100px] sm:min-h-[100px] md:min-h-[300px] flex items-center px-14 sm:px-14 md:px-32 mt-auto sm:mt-auto">
        {!formattedImage.loading && formattedImage.fileName ? (
          <div className="w-fit">
            {formattedImage.fileUrl && !formattedImage.loading && (
              <div id="image" className="rounded-lg overflow-hidden my-8 sm:my-8 md:my-8 hover:scale-125">
                <img width="180" height="240" src={formattedImage.fileUrl} />
              </div>
            )}
          </div>
        ) : (
          <span className="w-full text-center sm:text-center md:text-left md:px-0 xl:px-20 text-[1rem] md:text-xl text-gray-400 font-bold">
            Nenhuma imagem foi convertida
          </span>
        )}
      </section>
    </>
  );
}
