import React from "react";

const ImageUploader = ({ images, handleFileChange, removeImage }: any) => (
  <div
    onDrop={(e) => {
      e.preventDefault();
      if (e.dataTransfer.files)
        handleFileChange({ target: { files: e.dataTransfer.files } });
    }}
    onDragOver={(e) => e.preventDefault()}
    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
  >
    <input
      type="file"
      multiple
      className="hidden"
      onChange={handleFileChange}
      id="images"
    />
    <p>اسحب وأفلت الصور هنا، أو انقر للاختيار</p>
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((file: File, i: number) => (
        <div key={i} className="relative">
          <img
            src={URL.createObjectURL(file)}
            className="w-full h-24 object-cover rounded"
          />
          <button
            onClick={() => removeImage(i)}
            className="absolute top-0 right-0"
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ImageUploader;
