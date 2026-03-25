/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable react/jsx-sort-props */
"use client";

import { updateProject } from "@/lib/query/project";
import { TProject } from "@/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { SharedSelection } from "@heroui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  useForm,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import TextEditor from "../Blogs/TextEditor";

const category = [
  { key: "SEO", label: "SEO" },
  { key: "Content", label: "Content" },
  { key: "Visual", label: "Visual" },
];

interface EditProjectModalProps {
  project: TProject;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const EditProjectModal = ({
  project,
  isOpen,
  onOpenChange,
  onClose,
}: EditProjectModalProps) => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const { control, register, reset, handleSubmit } =
    useForm<FieldValues>({
      defaultValues: {
        projectName: "",
        link: "",
        category: "uncategorized",
        projectDescription: "",
        projectImage: null,
      },
    });

  const upload_preset = "ml_default";
  const cloud_name = "dma4usxh0";

  useEffect(() => {
    if (project) {
      reset({
        projectName: project.projectName,
        link: project.link,
        category: project.category || "uncategorized",
        projectDescription: project.projectDescription,
        projectImage: project.projectImage || null,
      });
      setContent(project.projectDescription || "");
    }
  }, [project, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating project...", { duration: Infinity });
    
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

    try {
      const formData = new FormData();
      const payload = {
        projectName: data.projectName,
        link: data.link,
        category: data.category,
        projectDescription: finalContent,
      };

      formData.append("data", JSON.stringify(payload));
      if (data.projectImage?.[0]) {
        formData.append("file", data.projectImage[0]);
      }

      const res = await updateProject(formData, project._id);
      if (res?.success) {
        toast.success("Project updated!", { id: toastId });
        router.refresh();
        onClose();
      } else {
        toast.error(res?.message || "Update failed", { id: toastId });
      }
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Unexpected error", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      backdrop="blur"
      className="max-h-[95vh] overflow-y-auto"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Update Project</ModalHeader>
          <ModalBody>
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Name & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("projectName", { required: true })}
                  placeholder="Project Name"
                  className="w-full rounded-md py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                />
                <input
                  type="file"
                  {...register("projectImage")}
                  className="w-full bg-white dark:bg-gray-800 text-sm rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-gray-500 dark:focus:border-gray-700 file:cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 dark:file:bg-gray-700 file:text-black dark:file:text-gray-300"
                />
              </div>

              {/* GitHub + Live Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("link", { required: true })}
                  placeholder="link"
                  className="w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                />

                <Controller
                  control={control}
                  name="category"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      placeholder="Select Category"
                      selectionMode="single"
                      selectedKeys={new Set([value])}
                      onSelectionChange={(keys: SharedSelection) =>
                        onChange(Array.from(keys)[0] || "")
                      }
                      classNames={{
                        base: "w-full rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:ring-2 focus:ring-purple-500",
                      }}
                    >
                      {category.map((cat) => (
                        <SelectItem key={cat.key}>{cat.label}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>

              {/* Tech / Category / Featured */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
              </div>

              {/* Description - Advanced Editor */}
              <div>
                <TextEditor content={content} setContent={setContent} />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" color="primary" radius="sm">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProjectModal;
