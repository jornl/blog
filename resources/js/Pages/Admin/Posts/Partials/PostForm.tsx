import { FormEvent, Fragment, ReactNode, useEffect, useState } from "react";
import FormInput from "@/Components/Form/FormInput";
import { cn } from "@/Utilities/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Category, CategoryResource } from "@/types/categories";
import Editor from "@/Components/MarkdownEditor/MarkdownEditor";
import { Post } from "@/types/posts";
import { router, useForm } from "@inertiajs/react";

type PostFormProps = {
  post: Post;
  category?: Category | undefined;
  categories: CategoryResource[];
  children: ReactNode;
};

const PostForm = ({
  post,
  category: postCategory,
  categories,
  children,
}: PostFormProps) => {
  const [show, setShow] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(postCategory ?? undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const {
    post: save,
    data,
    setData,
    errors,
    reset,
    progress,
  } = useForm<Post>(post);

  useEffect(() => {
    if (data.post_image) {
      setPreview(URL.createObjectURL(data.post_image));
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [data.post_image]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (post.id) {
      return router.post(
        route("admin.posts.update", post.id),
        {
          ...data,
          _method: "patch",
        },
        {
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }

    return save(route("admin.posts.store"));
  };

  return (
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
              value={data.title ?? ""}
            />
          </label>
          {errors.title && (
            <p className="text-xs mt-1 text-error">{errors.title}</p>
          )}
        </div>
        <div className="my-5 relative">
          <Listbox
            defaultValue={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event as Category);
              setData("category_id", (event as Category).id);
            }}
          >
            <Label className="label">Category</Label>
            <ListboxButton
              className={cn(
                "input input-bordered w-full mb-1 relative text-left",
                { "input-error": errors.category_id },
              )}
              id="category"
            >
              {selectedCategory?.name || "Select a category"}
            </ListboxButton>

            <ListboxOptions
              transition
              as="ul"
              className="
                absolute w-full max-h-64 overflow-y-auto z-[100]
                origin-top transition duration-100 ease-in data-[closed]:scale-95 data-[closed]:opacity-0
                divide-y divide-base-100 rounded-md shadow-lg bg-base-200"
            >
              {categories.map((category) => (
                <ListboxOption
                  as="li"
                  key={category.id}
                  value={category}
                  className="
                    group px-4 py-2
                    relative block hover:bg-secondary hover:text-white cursor-pointer
                    data-[focus]:bg-secondary data-[focus]:text-white data-[selected]:bg-secondary
                    data-[selected]:text-white data-[selected]:font-semibold"
                >
                  {category.name}
                  <span className="ri-check-line ml-5 hidden group-data-[selected]:inline" />
                </ListboxOption>
              ))}
            </ListboxOptions>
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
              value={data.excerpt ?? ""}
            />
          </label>
        </div>

        <div className="my-10">
          {(preview || post.image) && (
            <figure className="mb-5">
              <img
                className="w-full max-h-96 object-cover rounded-xl"
                src={`${preview ?? post.image}`}
                alt={`/${post.title}'s header image`}
              />
            </figure>
          )}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <FormInput
              type="file"
              id="image"
              name="post_image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  return setData("post_image", e.target.files[0]);
                }
              }}
            />
          </label>
          {progress && (
            <progress value={progress.percentage} max="100">
              {progress.percentage}%
            </progress>
          )}
          {errors.post_image && (
            <p className="text-xs mt-1 text-error">{errors.post_image}</p>
          )}
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
          <DisclosureButton
            className="collapse-title text-xl font-medium"
            onClick={() => setShow(!show)}
          >
            Options
          </DisclosureButton>
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
            <DisclosurePanel className="collapse-content relative">
              <div className="my-5">
                <div className="form-control mb-3">
                  <label className="cursor-pointer label">
                    <span className="label-text">Published</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={data.is_published}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          return setData((prevState) => ({
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
                {data.is_published && (
                  <>
                    <div className="form-control mb-3">
                      <label className="label">
                        <span className="label-text">Published At</span>
                      </label>
                      <FormInput
                        type="date"
                        className="w-full"
                        value={
                          post.published_at
                            ? new Date(post.published_at)
                                .toISOString()
                                .split("T")[0]
                            : data.published_at
                              ? new Date(data.published_at)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                        }
                        onChange={(e) =>
                          setData("published_at", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor="unpublised_at">
                        <span className="label-text">Unpublished At</span>
                      </label>
                      <FormInput
                        type="date"
                        className="w-full"
                        value={
                          post.unpublished_at
                            ? new Date(post.unpublished_at)
                                .toISOString()
                                .split("T")[0]
                            : data.unpublished_at
                              ? new Date(data.unpublished_at)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                        }
                        onChange={(e) =>
                          setData("unpublished_at", e.target.value)
                        }
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
                    checked={data.is_featured}
                    onChange={(e) => setData("is_featured", e.target.checked)}
                  />
                </label>
              </div>
            </DisclosurePanel>
          </Transition>
        </Disclosure>
        {children}
        <button
          className="btn btn-outline btn-neutral w-full"
          onClick={() => reset()}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
