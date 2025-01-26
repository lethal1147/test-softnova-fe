import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[url(/images/login-bg.webp)]">
      <Card className="w-full px-10 mx-5 sm:mx-0 sm:w-1/2 lg:w-1/3 h-1/2 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-main-text text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 w-full m-auto">
          <Input />
          <Input />
          <Input />
        </CardContent>
        <CardFooter className="flex justify-end gap-5">
          <Button asChild variant="outline">
            <Link to="/login">Back</Link>
          </Button>
          <Button>Register</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
