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
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/react-query/Queries";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
	const { toast } = useToast();
	const { checkAuthUser } = useUserContext();
	const navigate = useNavigate();

	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
		useCreateUserAccount();
	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		try {
			const newUser = await createUserAccount(values);

			if (!newUser) {
				return toast({
					title: "Sign-up failed, Please try again.",
				});
			}

			const session = await signInAccount({
				email: values.email,
				password: values.password,
			});

			if (!session) {
				toast({ title: "Something went wrong. Please login your new account" });
				navigate("/sign-in");
				return;
			}

			const isLoggedIn = await checkAuthUser();

			if (isLoggedIn) {
				form.reset();
				navigate("/");
			} else {
				toast({ title: "Login failed. Please try again." });
			}
		} catch (error) {
			console.error(error);
			toast({ title: "An unexpected error occurred. Please try again." });
		}
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Create a new account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					To use SnapGram enter your details
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
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
						{isCreatingAccount || isSigningIn ? (
							<div className="flex-center gap-2">Loading...</div>
						) : (
							"Submit"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Already have an account?
						<Link
							to="/sign-in"
							className="text-primary-500 text-small-semibold ml-1"
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;

// !------------------------- old code -------------------------------
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SignupValidation } from "@/lib/validation";
// import { z } from "zod";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserAccount } from "@/lib/appwrite/api";

// // the Toast handler:
// import { useToast } from "@/components/ui/use-toast";
// import {
// 	useCreateUserAccount,
// 	useSignInAccount,
// } from "@/lib/react-query/queriesAndMutations";
// import { useUserContext } from "@/context/AuthContext";

// const SignupForm = () => {
// 	// 'toast hook':
// 	const { toast } = useToast();
// 	// const isPending = true;
// 	const { checkAuthUser, isPending: isUserLoading } = useUserContext();
// 	const navigate = useNavigate();

// 	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
// 		useCreateUserAccount();

// 	const { mutateAsync: signInAccount, isPending: isSigningIn } =
// 		useSignInAccount();

// 	// 1. Define your form.
// 	const form = useForm<z.infer<typeof SignupValidation>>({
// 		resolver: zodResolver(SignupValidation),
// 		defaultValues: {
// 			name: "",
// 			email: "",
// 			username: "",
// 			password: "",
// 		},
// 	});

// 	// 2. Define a submit handler.
// 	async function onSubmit(values: z.infer<typeof SignupValidation>) {
// 		// Do something with the form values.
// 		// ✅ This will be type-safe and validated.
// 		// console.log(values);

// 		const newUser = await createUserAccount(values);

// 		if (!newUser) {
// 			return toast({
// 				title: "Sign-up failed, Please try again.",
// 			});
// 		}

// 		const session = await signInAccount({
// 			email: values.email,
// 			password: values.password,
// 		});

// 		// if (!session) {
// 		// 	return toast({
// 		// 		title: "Sign-in failed, Please try again.",
// 		// 	});
// 		// }
// 		if (!session) {
// 			toast({ title: "Something went wrong. Please login your new account" });

// 			navigate("/sign-in");

// 			return;
// 		}
// 		const isLoggedIn = await checkAuthUser();

// 		if (isLoggedIn) {
// 			form.reset();

// 			navigate("/");
// 		} else {
// 			toast({ title: "Login failed. Please try again." });

// 			return;
// 		}
// 	}

// 	return (
// 		<Form {...form}>
// 			<div className="sm:w-420 flex-center flex-col">
// 				<img src="/assets/images/logo.svg" alt="logo" />

// 				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
// 					create a new account
// 				</h2>
// 				<p className="text-light-3 small-medium md:base-regular mt-2">
// 					to use SnapGram enter your details
// 				</p>

// 				<form
// 					onSubmit={form.handleSubmit(onSubmit)}
// 					className="flex flex-col gap-5 w-full mt-4"
// 				>
// 					{/* for Name */}
// 					<FormField
// 						control={form.control}
// 						name="name"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Name</FormLabel>
// 								<FormControl>
// 									<Input type="text" className="shad-input" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					{/* for email */}
// 					<FormField
// 						control={form.control}
// 						name="email"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>email</FormLabel>
// 								<FormControl>
// 									<Input type="email" className="shad-input" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					{/* for Username */}
// 					<FormField
// 						control={form.control}
// 						name="username"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Username</FormLabel>
// 								<FormControl>
// 									<Input type="text" className="shad-input" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					{/* for Password */}
// 					<FormField
// 						control={form.control}
// 						name="password"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Password</FormLabel>
// 								<FormControl>
// 									<Input type="password" className="shad-input" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<Button type="submit" className="shad-button_primary mt-4">
// 						{isCreatingAccount ? (
// 							<div className="flex-center gap-2">Loading...</div>
// 						) : (
// 							"Submit"
// 						)}
// 					</Button>
// 					<p className="text-small-regular text-light-2 text-center mt-2">
// 						already has an account
// 						<Link
// 							to={"/sign-in"}
// 							className="text-primary-500 text-small-semibold ml-1"
// 						>
// 							log in
// 						</Link>
// 					</p>
// 				</form>
// 			</div>
// 		</Form>
// 	);
// };

// export default SignupForm;
