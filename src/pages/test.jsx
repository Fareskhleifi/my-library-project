import { request } from "../axios_helper";
import { useEffect, useState } from "react";

export default function Test() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      request('get', '/user/alone', null, {
        Authorization: `Bearer ${token}`
      })
        .then(response => {
          setMessage(response.data);
        })
        .catch(error => {
          console.error("Error fetching livres:", error);
        });
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
