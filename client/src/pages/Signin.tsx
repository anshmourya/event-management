import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginInputs } from "@/constant/inputs";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  return (
    <div className="container grid h-screen place-items-center">
      <form
        className="m-auto max-w-[500px] w-full"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <H1 className="text-center">SignIn</H1>
        <div className="grid gap-5">
          {loginInputs.map((input) => (
            <div key={input.name}>
              <Label>{input.placeholder}</Label>
              <Input placeholder={input.placeholder} />
            </div>
          ))}
        </div>
        <div className="flex justify-center my-10 ">
          <Button className="w-full">Let&apos;s goo!!!</Button>
        </div>
        <Button
          variant="link"
          className="float-right"
          type="button"
          onClick={() => navigate("/signup")}
        >
          create your account..
        </Button>
      </form>
    </div>
  );
};

export default Signin;
