import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function PostsPage() {
  const { currentUser } = useContext(AuthContext);
  const [selectCategory, setSelectCategory] = useState("");

  const categories = [
    "All",
    "Culture",
    "Tech",
    "Personal",
    "Learning",
    "Other",
  ];

  return <div>PostsPage</div>;
}
