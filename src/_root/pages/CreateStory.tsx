import { useUserContext } from "@/context/AuthContext";
import { useCreateStory } from "@/lib/react-query/Queries";
import FileUploader from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { StoryValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import Loader from "@/components/shared/Loader";

const CreateStory = () => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: createStory, isPending: isLoadingCreate } = useCreateStory();

  const form = useForm<z.infer<typeof StoryValidation>>({
    resolver: zodResolver(StoryValidation),
    defaultValues: {
      file: [],
      textComment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof StoryValidation>) {
    try {
      const newStory = await createStory({
        ...values,
        userId: user.id,
      });

      if (!newStory) {
        toast({
          title: "Please try again",
          description: "There was an error creating your story",
          variant: "destructive",
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/add-story.svg"
            width={36}
            height={36}
            alt="add story"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Story</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
              control={form.control}
              name="textComment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Caption</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      placeholder="Add a caption to your story..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Media</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={field.value}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingCreate}>
                {isLoadingCreate ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Create Story"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateStory;
