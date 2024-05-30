import { CategoryResponse } from "@/types/categories";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, useForm } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import FormInput from "@/Components/Form/FormInput";
import MarkdownEditor from "@/Components/Form/MarkdownEditor";
import PostOptions from "@/Pages/Posts/Partials/PostOptions";
import { FormEvent, Fragment, useState } from "react";
import { cn } from "@/Utilities/utils";
import { Listbox, Transition } from "@headlessui/react";
import { Post } from "@/types/posts";

export default function Create({
  categories,
}: {
  categories: CategoryResponse[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);

  const { post, data, setData, errors, reset } = useForm<Post>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    post(route("posts.store"));
  };

  return (
    <BaseLayout>
      <Head title="Create Post" />
      <div className="container my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Create post</h1>
        <div className="">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="form my-5 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <div className="my-5">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <FormInput
                    className={cn("w-full", {
                      "input-error": errors.title,
                    })}
                    name="title"
                    id="title"
                    required={true}
                    placeholder="Post Title"
                    onChange={(e) => setData("title", e.target.value)}
                  />
                </label>
                {errors.title && (
                  <p className="text-xs mt-1 text-error">{errors.title}</p>
                )}
              </div>
              <div className="my-5 relative">
                <Listbox
                  value={selectedCategory}
                  onChange={(e: CategoryResponse): void => {
                    setSelectedCategory(e);
                    setData("category_id", e.id);
                  }}
                >
                  <Listbox.Label className="label">Category</Listbox.Label>
                  <Listbox.Button
                    className={cn(
                      "input input-bordered w-full mb-1 relative text-left",
                      { "input-error": errors.category_id },
                    )}
                    id="category"
                  >
                    {selectedCategory?.name || "Select a category"}
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="mt-1 absolute w-full max-h-64 overflow-auto z-[100]">
                      {categories.map((category) => (
                        <Listbox.Option
                          as={Fragment}
                          key={category.id}
                          value={category}
                        >
                          {({ active, selected }) => (
                            <li
                              className={cn(
                                "opacity-1 px-4 py-2 relative block bg-base-200 first:rounded-t-md last:rounded-b-md hover:bg-secondary hover:text-secondary-content cursor-pointer",
                                {
                                  "bg-secondary text-white": active || selected,
                                },
                              )}
                            >
                              {category.name}
                              {selected && (
                                <span className="ri-check-line ml-5"></span>
                              )}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
                {errors.category_id && (
                  <p className="text-xs mt-1 text-error">
                    {errors.category_id}
                  </p>
                )}
              </div>
              <div className="my-5">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Excerpt</span>
                  </div>
                  <FormInput
                    className="w-full"
                    name="excerpt"
                    id="excerpt"
                    placeholder="Excerpt"
                    onChange={(e) => setData("excerpt", e.target.value)}
                  />
                </label>
              </div>

              <div className="my-5">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Image</span>
                  </div>
                  <FormInput
                    type="file"
                    id="image"
                    accept="image/*"
                    name="image"
                    onChange={(e) => {
                      if (!e.target.files || e.target.files.length === 0) {
                        return;
                      }
                      setData("post_image", e.target.files[0]);
                    }}
                  />
                </label>
              </div>

              <div className="my-5">
                <MarkdownEditor
                  placeholder="Post Body"
                  onChange={(e) => setData("body", e)}
                  error={!!errors.body}
                />
                {errors.body && (
                  <p className="text-xs mt-1 text-error">{errors.body}</p>
                )}
              </div>
            </div>
            <div>
              <PostOptions setData={setData} data={data} />
              <button className="btn btn-outline btn-accent my-5 w-full">
                Create Post
              </button>

              <button
                className="btn btn-outline btn-neutral w-full"
                onClick={() => reset()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}
