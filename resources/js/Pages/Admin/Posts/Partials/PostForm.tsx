import { FormEvent, Fragment, useState } from "react";
import { FormContext } from "@/Pages/Admin/Posts/Partials/FormContext";
import { useForm } from "@inertiajs/react";
import PostOptions from "@/Pages/Admin/Posts/Partials/PostOptions";
import FormInput from "@/Components/Form/FormInput";
import { cn } from "@/Utilities/utils";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { CategoryResponse } from "@/types/categories";
import Editor from "@/Components/MarkdownEditor/MarkdownEditor";
import { Post } from "@/types/posts";
import { FormProvider } from "@/Pages/Admin/Posts/Partials/FormContext";

type PostFormProps = {
  post: Post;
  category: CategoryResponse;
  categories: CategoryResponse[];
  setData: (key: string, value: any) => void;
};

const PostForm = (
  {
    post,
    category,
    categories,
    ...props
  }: PostFormProps) => {
  const [show, setShow] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(category ?? null);

  const { setData, errors } = props;
  console.log(post);

  return (
    <>
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
              defaultValue={post.title ?? ""}
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
                    as={"div"}
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
            <p className="text-xs mt-1 text-error">{errors.category_id}</p>
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
              value={post.excerpt ?? ""}
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
          <Editor
            placeholder="Post Body"
            onChange={(e) => setData("body", e)}
            error={!!errors.body}
            content={post.body ?? ""}
          />
          {errors.body && (
            <p className="text-xs mt-1 text-error">{errors.body}</p>
          )}
        </div>
      </div>
      <div>
        <Disclosure as="div" className="collapse bg-base-200 relative">
          <Disclosure.Button
            className="collapse-title text-xl font-medium"
            onClick={() => setShow(!show)}
          >
            Options
          </Disclosure.Button>
          <Transition
            as={Fragment}
            show={show}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="collapse-content relative">
              <div className="my-5">
                <div className="form-control mb-3">
                  <label className="cursor-pointer label">
                    <span className="label-text">Published</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={post.is_published}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          return setData((prevState: any) => ({
                            ...prevState,
                            published_at: "",
                            unpublished_at: "",
                            is_published: e.target.checked,
                          }));
                        }
                        return setData("is_published", e.target.checked);
                      }}
                    />
                  </label>
                </div>
                {post.is_published && (
                  <>
                    <div className="form-control mb-3">
                      <label className="label">
                        <span className="label-text">Published At</span>
                      </label>
                      <FormInput
                        type="date"
                        className="w-full"
                        defaultValue={new Date(post.published_at).toISOString().split("T")[0]}

                        onChange={(e) => setData("published_at", e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor="unpublised_at">
                        <span className="label-text">Unpublished At</span>
                      </label>
                      <FormInput
                        type="date"
                        className="w-full"
                        defaultValue={
                          new Date(post.unpublished_at).toISOString().split("T")[0] === "1970-01-01" ? "" : new Date(post.unpublished_at).toISOString().split("T")[0]
                        }

                        onChange={(e) => setData("unpublished_at", e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Featured</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    checked={post.is_featured}
                    onChange={(e) => setData("is_featured", e.target.checked)}
                  />
                </label>
              </div>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
    </>
  );
};

export default PostForm;
