"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./pdf-upload.module.css";

function useFileUpload(file: File) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(() => {
    const upload = async () => {
      if (!file) {
        setError("No file selected");
        return;
      }

      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("YOUR_SERVER_URL", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (!response.ok) {
        setError("Upload failed, please try again.");
      }

      setIsUploading(false);
    };

    upload();
  }, [file]);

  return {
    onSubmit,
    disabled: !file || isUploading,
    error,
    isUploading,
  };
}

export function PDFUpload() {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
    });

  const { onSubmit, disabled, error } = useFileUpload(acceptedFiles[0]);

  return (
    <div>
      <div className={styles.wrapper} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your PDF here...</p>
        ) : (
          <p>
            Drag and drop your PDF here, or click to select it using the file
            browser
          </p>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <div className={styles.file}>
          {acceptedFiles.map((file, i) => {
            return (
              <p key={i}>
                {file.name} - {file.size} bytes
              </p>
            );
          })}
        </div>

        <button
          className={styles.button}
          disabled={disabled}
          onClick={onSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
