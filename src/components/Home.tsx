import { useState } from "react";
import Header from "./Header";
import GithubCorner from "./GithubCorner";
import FileInput from "./FileInput";
import Spinner from "./Spinner";

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

    const baseUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData();
    formData.append("heic", file?.[0]);

    formData.append("format", toFormat);

    try {
      setFormattedImage({ ...formattedImage, loading: true });
      fetch(`${baseUrl}/convert-image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          setFormattedImage({ ...formattedImage, fileUrl: url, fileName: file?.[0].name.split(".HEIC")[0] });
        });
    } catch (error) {
      console.error(error);
      setFormattedImage({ ...formattedImage, loading: false });

      alert("falha na conversão da imagem");
    }
  }

  return (
    <main className="bg-[#5091F8] min-w-[100vw] min-h-[100vh] overflow-x-hidden">
      <GithubCorner />
      <Header />
      <section className="w-full flex flex-col justify-center items-center py-10 sm:px-0 xl:px-20">
        <div className="flex flex-col py-16 w-fit">
          <span className="text-white font-bold text-[16px] sm:text-[30px] md:text-[40px] xl:text-[50px]">Convert your images from .HEIC</span>
          <span className="text-[0.9rem] text-white text-end">to .JPEG and .PNG</span>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center px-8 sm:px-8 md:px-20 w-full min-h-[40vh]">
          <div className="bg-white rounded-2xl min-h-fit w-full mx-10 shadow-2xl shadow-[#7A92FC] flex flex-col justify-center items-center">
            <FileInput selectedFiles={image} setSelectedFiles={setImage} />
            <hr className="w-full" />
            <select
              className="p-2 outline-none border-none active:rounded-none rounded-b-lg w-full h-full text-center bg-white hover:bg-gray-100 cursor-pointer font-bold italic text-[#5091F8]"
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
            >
              <option value="jpeg">{"HEIC >> JPEG"}</option>
              <option value="png">{"HEIC >> PNG"}</option>
            </select>
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

          <div>
            {formattedImage.fileUrl && (
              <div id="image" className="rounded-lg overflow-hidden my-8 sm:my-8 md:my-8 hover:scale-125">
                <img width="120" height="240" src={formattedImage.fileUrl} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
