/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client";
import { addProject } from "@/lib/query/project";
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
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const category = [
  { key: "SEO", label: "SEO" },
  { key: "Content", label: "Content" },
  { key: "Visual", label: "Visual" },
];

const AddProjectModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, control, register, reset } = useForm();
  const [values, setValues] = useState<string[]>([]);
  const router = useRouter();

  const handleSelectionChange = (keys: SharedSelection) => {
    setValues(Array.from(keys) as string[]); // Convert Set to array
  };

  const createProject = async (data: FieldValues) => {
    const toastId = toast.loading("Adding Project...");
    const formData = new FormData();

    const project = {
      projectName: data.projectName,
      link: data.link,
      projectDescription: data.projectDescription,
      category: data.category,
  
    };

    formData.append("data", JSON.stringify(project));
    formData.append("file", data.projectImage[0]);
    console.log(Object.fromEntries(formData));
    // console.log(data);

    const res = await addProject(formData);
    console.log(res);

    if (res?.success) {
      toast.success("Project added successfully", {
        id: toastId,
        duration: 2000,
      });
      router.refresh();
      onClose();
      reset();
    } else {
      toast.error("Failed to add project", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Button
        className="mt-2 text-sm md:text-base text-gray-900 dark:text-gray-100 px-4"
        radius="sm"
        onPress={onOpen}
      >
        Add Project
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        backdrop="blur"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(createProject)}>
            <ModalHeader>Add New Project</ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Name & Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register("projectName", { required: true })}
                    placeholder="Project Name"
                    className="w-full rounded-md py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                  />

                  <input
                    type="file"
                    {...register("projectImage", { required: true })}
                    className="w-full bg-white dark:bg-gray-800 text-sm rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-gray-500 dark:focus:border-gray-700 file:cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 dark:file:bg-gray-700 file:text-black dark:file:text-gray-300"
                  />
                </div>

                {/* GitHub Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register("link", { required: true })}
                    placeholder="Link"
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

                {/* Description */}
                <textarea
                  {...register("projectDescription")}
                  placeholder="Project Description"
                  rows={4}
                  className="w-full rounded-md px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none border border-gray-300 dark:border-gray-800 focus:bg-gray-50 dark:focus:border-gray-700"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" color="primary" radius="sm">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProjectModal;
