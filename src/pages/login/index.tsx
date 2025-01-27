import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/stores";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "./schema";
import { Input } from "@/components/ui/input";
import { handleError } from "@/utils";
import { PROJECT_NAMES } from "@/constants";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useUserStore();

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[url(/images/login-bg.webp)]">
      <Card className="w-full mx-5 sm:mx-0 sm:w-1/2 lg:w-1/3 h-1/2 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {PROJECT_NAMES}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-4/5 m-auto"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-3" type="submit">
                Login
              </Button>
              <Separator className="my-3" />
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
