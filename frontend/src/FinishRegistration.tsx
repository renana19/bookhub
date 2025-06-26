import { useRef } from 'react';
import './css/logIn.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { addResource } from './DBAPI';

interface NewUser {
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  address?: string;
  profileImageUrl?: string;
}

function FinishRegistration() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { username, password } = (location.state || {}) as { username: string; password: string };

  if (!username || !password) {
    navigate("/register");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const newUser: NewUser = {
      username,
      fullname: (formData.get("fullname") as string) || "",
      email: (formData.get("email") as string) || "",
      passwordHash: password,  // אם תרצי פה אפשר לשלב hashing
      address: (formData.get("address") as string) || undefined,
      profileImageUrl: (formData.get("profileImageUrl") as string) || undefined
    };

    if (!newUser.fullname || !newUser.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const response = await addResource("users", newUser);
    if (response) {
      console.log("User added successfully:", response);
      localStorage.setItem("currentUser", JSON.stringify(response));
      navigate("/Home");
    } else {
      console.error("Failed to add user");
      alert("Failed to register user.");
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullname" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" />
        </label>
        <label>
          Profile Image URL:
          <input type="url" name="profileImageUrl" />
        </label>
        <button type="submit">Finish Registration</button>
      </form>
    </div>
  );
}

export default FinishRegistration;
