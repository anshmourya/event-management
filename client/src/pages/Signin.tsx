import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginInputs } from "@/constant/inputs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/validation";
import { useMutation } from "@tanstack/react-query";
import useAccount from "@/hooks/useAccount";
import toast from "react-hot-toast";
const Signin = () => {
  const navigate = useNavigate();
  const { createSession } = useAccount();
  const form = useForm({
    resolver: yupResolver(signInSchema),
  });

  const loginHandler = useMutation({
    mutationFn: createSession,
    mutationKey: ["loginHandler"],
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const onsubmit = async (data) => {
    await toast.promise(loginHandler.mutateAsync(data), {
      loading: "Processing",
      error: loginHandler?.error?.message,
      success: "you are successfully signed in",
    });
  };

  return (
    <div className="container grid h-screen place-items-center">
      <form
        className="m-auto max-w-[500px] w-full"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <H1 className="text-center">SignIn</H1>
        <div className="grid gap-5">
          {loginInputs.map((input) => (
            <div key={input.name}>
              <Label>{input.placeholder}</Label>
              <Input
                placeholder={input.placeholder}
                control={form.control}
                name={input.name}
              />
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
