import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function Resume({ career, email, careerId , coverLetter}) {
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    if (!email || !career) {
      alert("Please provide all required details!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("career", career);
    formData.append("email", email);
    formData.append("careerId", careerId);
    formData.append("coverLetter", coverLetter);


    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        handlePopup();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {popup && (
        <div
          className={`fixed inset-0 bg-black/25 flex items-center justify-center z-50 
                      transition-opacity duration-300 ${popup ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-white p-6 text-black absolute w-2/5 space-y-3 rounded-sm transition-transform transform duration-300 scale-100">
            <div className="flex justify-end">
              <X onClick={handlePopup} className="h-5 w-5 cursor-pointer" />
            </div>
            <p className="uppercase text-center">
              Your resume has been uploaded successfully!
            </p>
          </div>
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="px-6 py-2 bg-black text-white">
        Upload My Resume
      </button>
    </>
  );
}
