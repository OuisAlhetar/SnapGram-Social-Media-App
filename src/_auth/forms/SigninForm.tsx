import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
	const { toast } = useToast();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
	const navigate = useNavigate();

	// Query:
	const { mutateAsync: signInAccount, isPending: isLoading } =
		useSignInAccount();

	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
		const session = await signInAccount(user);

		if (!session) {
			toast({ title: "Login failed=>(No-Session). Please try again." });

			return;
		}

		const isLoggedIn = await checkAuthUser();
		console.log(isLoggedIn);

		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			toast({ title: "Login failed=>(No-Identical). Please try again." });
			return;
		}
	};

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Login to user Account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Welcome back, Please enter your details
				</p>
				<form
					// onSubmit={form.handleSubmit(onSubmit)}
					onSubmit={form.handleSubmit(handleSignin)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
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
									<Input type="password" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary mt-4">
						{isLoading || isUserLoading ? (
							<div className="flex-center gap-2">Loading...</div>
						) : (
							"login"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Don't have an account?
						<Link
							to="/sign-up"
							className="text-primary-500 text-small-semibold ml-1"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;
