/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
"use client";
import { useRef, useState } from "react";
import { addBlog } from "@/lib/query/project";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
 
import { useRouter } from "next/navigation";
import TextEditor from "./TextEditor";
 

const AddBlogsModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [content, setContent] = useState("");
  const router = useRouter();
  const { handleSubmit, register, reset, setValue } = useForm();

  const upload_preset = "ml_default";
  const cloud_name = "dma4usxh0";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Blog", { duration: Infinity });

    let finalContent = content;
    const imagesToUpload: { src: string; originalTag: string }[] = [];

    const imgRegex = /<img[^>]+src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      imagesToUpload.push({ src: match[1], originalTag: match[0] });
    }

    for (const img of imagesToUpload) {
      try {
        const imageData = new FormData();
        imageData.append("file", img.src);
        imageData.append("upload_preset", upload_preset);
        imageData.append("cloud_name", cloud_name);

        const imageUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!imageUploadResult.ok) {
          throw new Error("Embedded image upload failed");
        }

        const uploadedImage = await imageUploadResult.json();
        const newImgTag = img.originalTag.replace(img.src, uploadedImage.url);
        finalContent = finalContent.replace(img.originalTag, newImgTag);
      } catch (error: any) {
        console.error("Error uploading embedded image:", error);
        toast.error("Failed to upload an embedded image.", { id: toastId });
      }
    }

    const blogData = {
      author: "Shomik Ujzaman",
      title: formData.title,
      category: formData.category,
      description: finalContent,
    };

    const newData = new FormData();
    newData.append("data", JSON.stringify(blogData));
    newData.append("file", formData.blogImage[0]);

    try {
      const res = await addBlog(newData);

      // console.log(res);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        reset();
        setContent("");
        router.refresh();
        onClose();
      }
    } catch (err: any) {
      console.error("Error creating blog:", err);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <Button
        className="mt-2 text-sm md:text-base text-gray-900 dark:text-gray-100 px-4"
        radius="sm"
        onPress={onOpen}
      >
        Add Blog
      </Button>
      <Modal
        size="3xl"
        isOpen={isOpen}
        backdrop="blur"
        isDismissable={false} // Prevents closing on backdrop click
        isKeyboardDismissDisabled={true} // Disables closing on ESC key
        onOpenChange={onOpenChange}
        className=" h-[90vh] overflow-y-auto"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Add New Blog
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center mt-0">
                <div className="w-full max-w-3xl space-y-4">
                  {/* Blog Title & Upload Image (Same Row) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      {...register("title")}
                      placeholder="Blog Title"
                      className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                    />
                    <input
                      type="file"
                      {...register("blogImage")}
                      className="w-full bg-white dark:bg-gray-800 text-sm py-0 rounded-md outline-none border-[#dddddd] dark:border-gray-800 border focus:border-[#c5c4c4] transition-all file:cursor-pointer cursor-pointer file:border-0 file:py-[12px] file:px-4 file:mr-4 file:bg-[#DDDDDD] dark:focus:border-gray-700 dark:file:bg-gray-700 dark:file:text-gray-300 file:text-black dark:text-gray-300"
                      placeholder="Upload Image"
                    />
                  </div>

                  {/* Blog Category */}
                  <select
                    {...register("category")}
                    className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                  >
                    <option disabled>Select Category</option>
                    <option value="tech">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                  </select>
                  <div>
                    <TextEditor content={content} setContent={setContent} />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddBlogsModal;