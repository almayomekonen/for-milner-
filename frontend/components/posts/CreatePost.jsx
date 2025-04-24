import { useState } from "react";
import CreatePostView from "./CreatePostView";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

export default function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Other",
    language: "English",
  });

  // images state
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  // event handlers

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleImageChange(event) {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  }

  function removeImage(index) {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreview];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setImagePreview(updatedPreviews);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const postFormData = new FormData();
      postFormData.append("title", formData.title);
      postFormData.append("content", formData.content);
      postFormData.append("category", formData.category);
      postFormData.append("language", formData.language);

      images.forEach((image) => {
        postFormData.append("images", image);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post("/posts", postFormData, config);

      if (response.data.success) {
        navigate(`/posts/${response.data.data._id}`);
      }
    } catch (error) {
      setError(error.response.data.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CreatePostView
      formData={formData}
      handleChange={handleChange}
      imagePreview={imagePreview}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      images={images}
    />
  );
}
