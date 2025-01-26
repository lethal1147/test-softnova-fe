import PreviewImage from "@/components/input/imageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookSchema, BookSchemaType } from "../schema";
import { Button } from "@/components/ui/button";
import { useBookStore } from "@/stores/bookStore";
import { useEffect } from "react";

export default function BookForm({ onClose }: { onClose: () => void }) {
  const form = useForm<BookSchemaType>({
    resolver: zodResolver(bookSchema),
  });
  const image = form.watch("bookImage");
  const { selectedBook, submitBook } = useBookStore();

  const onSubmit = async (data: BookSchemaType) => {
    if (selectedBook && selectedBook.id) {
      await submitBook(data, selectedBook.id);
    } else {
      await submitBook(data);
    }
    onClose();
  };

  useEffect(() => {
    if (!selectedBook) return;

    form.reset({
      name: selectedBook.name,
      author: selectedBook.author,
      price: selectedBook.price,
      bookImage: selectedBook.bookImage,
    });
  }, [selectedBook]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 pt-5"
      >
        <div className="flex gap-10">
          <div>
            <FormField
              control={form.control}
              name="bookImage"
              render={({ fieldState: { error } }) => (
                <FormItem className="flex size-full items-start justify-center">
                  <FormControl className=" w-[180px] h-[240px]">
                    <div className="">
                      <label className="size-full" htmlFor="bookImage">
                        <div className="relative size-full">
                          <PreviewImage image={image} error={error} />
                        </div>
                      </label>
                      <Input
                        className="hidden"
                        id="bookImage"
                        type="file"
                        onChange={(e) => {
                          const { files } = e.target;
                          if (files && files[0]) {
                            form.setValue("bookImage", files[0]);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Book name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min={0}
                      type="number"
                      placeholder="Price"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
