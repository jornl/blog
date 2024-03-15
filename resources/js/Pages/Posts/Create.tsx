import { CategoryResponse } from "@/types/categories";
import { PaginatedResponse } from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import FormInput from "@/Components/Form/FormInput";
import MarkdownEditor from "@/Components/Form/MarkdownEditor";
import PostOptions from "@/Pages/Posts/Partials/PostOptions";

export default function Create({
  categories,
}: {
  categories: PaginatedResponse<CategoryResponse>;
}) {
  return (
    <BaseLayout>
      <Head title="Create Post" />
      <div className="container my-5 px-4">
        <Breadcrumbs />
        <h1 className="text-2xl">Create post</h1>
        <div className="">
          <form
            action={route("posts.store")}
            method="post"
            className="form my-5 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <div className="my-5">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <FormInput
                    className="w-full"
                    name="title"
                    id="title"
                    placeholder="Post Title"
                  />
                </label>
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
                  />
                </label>
              </div>
              <div className="my-5">
                <MarkdownEditor placeholder="Post content" />
              </div>
            </div>
            <div>
              <PostOptions />
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}
