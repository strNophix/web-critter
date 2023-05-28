import { LoginCard } from "@/components/login";
import image from "@/assets/login-bg.jpg";

function Login() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-1/5">
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
