import { LoginForm } from "../_components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RegisterForm from "../_components/RegisterForm";

export default function Page() {
  return (
    <div className="flex min-h-lvh w-full items-center justify-center p-28 md:p-10">
      <div className="w-full max-w-xl">
        <Card>
        <CardHeader>
          <CardTitle>Welcome To RentNest</CardTitle>
          <CardDescription>
            Ready to Create your account?
          </CardDescription>
        </CardHeader>
        <CardContent className="">
            <RegisterForm/>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
