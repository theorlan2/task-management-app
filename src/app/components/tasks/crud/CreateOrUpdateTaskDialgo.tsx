"use client";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TaskCriteria } from "@/types/criterias/task/task.criteria";
import { useEffect } from "react";
import { Task } from "@/types/models/task/task.model";
import { TaskStatusEnum } from "@/types/enums/task.enum";

const taskSchema = yup.object().shape({
  id: yup.string().optional().optional(),
  title: yup.string().required(),
  description: yup.string().optional().nullable(),
  status: yup.string().required(),
  userId: yup.number().optional().nullable(),
});

type Props = {
  isOpen: boolean;
  dataTask?: Task;
  isLoading: boolean;
  isError?: boolean;
  setIsOpen: (v: boolean) => void;
  onSubmit?: (v: TaskCriteria) => void;
};

const CreateOrUpdateTaskDialog = ({
  isOpen,
  setIsOpen,
  onSubmit,
  dataTask,
  isLoading,
  isError,
}: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver<TaskCriteria>(taskSchema),
  });

  function close() {
    setIsOpen(false);
  }

  function onSubmitForm(data: TaskCriteria) {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  useEffect(() => {
    if (dataTask) {
      reset(dataTask);
    } else {
      reset({
        title: "",
        description: "",
        status: TaskStatusEnum.TODO,
        userId: 0,
      });
    }
  }, [dataTask, reset]);

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center bg-black/50 p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-700 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-medium text-white">
                {dataTask ? ` Update task` : `Create new task`}
              </DialogTitle>

              <div className="mt-2">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className=" w-full flex justify-between   ">
                    <div className=" w-full ">
                      <Field>
                        <Label className="text-sm/6 font-medium text-primary-black">
                          Title
                        </Label>
                        <Controller
                          name="title"
                          control={control}
                          render={({ field }) => (
                            <Input
                              disabled={isLoading}
                              className={
                                "mt-1 block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                              }
                              {...field}
                            />
                          )}
                        />
                        {errors.title && (
                          <p className="text-xs text-red-500">
                            {errors.title.message}
                          </p>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="w-full  my-2 sm:gap-4">
                    <Field>
                      <Label className=" text-sm font-medium text-gray-700 dark:text-white">
                        Description
                      </Label>
                      <div className="w-full ">
                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              placeholder="Description"
                              disabled={isLoading}
                              className={
                                "mt-1 block w-full  rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                              }
                              {...field}
                            />
                          )}
                        />

                        {errors.description && (
                          <p className="text-xs text-red-500">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                    </Field>
                  </div>

                  <div className=" w-full mt-3 ">
                    <Field>
                      <Label className="text-sm/6 font-medium text-primary-black">
                        Status
                      </Label>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            disabled={isLoading}
                            className="mt-1  block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/2 dark:bg-white dark:text-black"
                          >
                            <option value="TODO">Todo</option>
                            <option value="PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                          </select>
                        )}
                      />
                    </Field>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      type="button"
                      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                      disabled={isLoading}
                      onClick={close}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="rounded-full dark:bg-white text-black transition-colors flex gap-2 items-center justify-center bg-gray-300 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                    >
                      {dataTask ? `Update` : `Create`}
                      <i className="ri-save-line"></i>
                    </Button>
                  </div>
                  <div className="w-full">
                    {isError && (
                      <p className="text-xs text-red-500">
                        An unexpected error has occurred, please try again
                        later.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateOrUpdateTaskDialog;
