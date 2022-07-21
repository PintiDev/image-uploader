import React, { useCallback, useEffect, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import copy from "copy-to-clipboard";
import Head from "next/head";
import toast from "react-hot-toast";
const Index = () => {
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [valid, setValid] = useState(false);
  const [done, setDone] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setValid(true);
      const imgRef = ref(
        storage,
        "gs://image-uploader-e9595.appspot.com/images"
      );
      const uploadTask = uploadBytesResumable(imgRef, acceptedFiles[0]);
      uploadTask.on(
        "state_changed",
        (snap) => {
          setProgress((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (err) => {},
        (complete) => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => setImgUrl(url));
        }
      );
    }
  }, []);
  useEffect(() => {
    if (Math.floor(progress) === 100) {
      setDone(true);
    }
  }, [progress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });
  return (
    <div className="flex bg-baseBg items-center justify-center h-screen w-full">
      <div className="absolute text-gray-500 bottom-4 ">
        Created By{" "}
        <a
          href="https://pintidevaziz.vercel.app/"
          target={"_blank"}
          className="text-themeBlue hover:underline"
        >
          PintiDevAziz
        </a>
      </div>

      <Head>
        <title>Image uploader By PintiDevAziz</title>
      </Head>
      {valid == true ? (
        done ? (
          <div className="shadow-2xl rounded-md items-center flex flex-col h-[30rem] w-[30rem] p-10">
            <div className="w-10 h-10 text-3xl flex items-center justify-center mb-4 ">
              ✅
            </div>
            <h2 className="text-xl font-semibold mb-4">Upload Succesfuly</h2>
            <img
              src={imgUrl}
              alt=""
              className="h-[15rem] object-cover w-full rounded-lg"
            />
            <div className="mt-6 w-full flex justify-center">
              <input
                type="text"
                readOnly
                className="w-full h-10 outline-none bg-gray-200 rounded-md px-2"
                value={imgUrl}
              />
              <button
                onClick={(e) => {
                  copy(imgUrl);
                  toast.success("Img Url Copied");
                }}
                className="px-4 py-1 rounded-md bg-themeBlue text-white ml-2"
              >
                Copy
              </button>
            </div>
          </div>
        ) : (
          <div className="shadow-2xl  w-96 h-28 rounded-lg p-3">
            <h2 className="font-semibold text-lg  pb-4">Uploading</h2>
            <div className="bg-gray-100 w-full h-2 rounded-full">
              <div
                style={{ width: Math.floor(progress) + "%" }}
                className="h-full bg-themeBlue"
              ></div>
            </div>
            <p className="text-gray-500 pt-3">{Math.floor(progress)} %</p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-md flex flex-col items-center shadow-2xl gap-y-6  h-[35rem] w-[30rem] px-6 py-10">
          <h2 className="text-xl font-semibold ">Upload Your Image</h2>
          <p className="text-gray-500">File Should Be list</p>
          <div
            {...getRootProps()}
            className="w-full rounded-xl h-[15rem] m flex items-center justify-center flex-col  border-dashed border-2  border-themeBlue"
          >
            <img src="/image.svg" alt="" className="mb-5" />
            <p className="text-gray-500">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </p>
            <input {...getInputProps()} type="file" id="imagefile" />
          </div>
          {error && (
            <div className="text-red-500  font-semibold tracking-widest">
              {error}
            </div>
          )}
          <p className="text-gray-500">Or</p>
          <label
            htmlFor="imagefile"
            className="rounded-md font-semibold cursor-pointer hover:bg-themeBlue/95 bg-themeBlue text-white flex items-center justify-center  w-36 h-10"
          >
            Chose a file
          </label>
        </div>
      )}
    </div>
  );
};

export default Index;
