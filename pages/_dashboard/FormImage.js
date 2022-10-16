import Image from "next/image";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

export default function FormImage() {
  const [files, setFiles] = useState([]);

  const onDrop = (files) => {
    console.log("Accept: ", files);
    const der = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFiles(der);
  };

  useEffect(() => {
    console.log("FILE CHANGES");
    console.log(files);
    console.log("-----------------------------------");
  }, [files]);

  return (
    <Dropzone
      onDrop={onDrop}
      accept={{ "image/jpeg": [], "image/png": [] }}
      maxFiles={1}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="mx-auto mt-12 mb-8 rounded-lg border-2 border-primary p-4 cursor-pointer hover:bg-white hover:border-white"
        >
          <input {...getInputProps()} />
          <div className="text-center">
            {files.length < 1 && (
              <Image
                width={200}
                height={100}
                alt="add image"
                src="/add-image-icon.svg"
              />
            )}
            {files.map(({ name, preview }) => (
              <Image
                key={name}
                width={200}
                height={200}
                alt={name}
                title={name}
                src={preview}
                className="rounded-lg"
              />
            ))}
          </div>
          <div className="text-center">
            Drag-drop atau {files.length > 0 ? "mengganti" : "pilih"} gambar
            untuk data minuman
          </div>
        </div>
      )}
    </Dropzone>
  );
}
