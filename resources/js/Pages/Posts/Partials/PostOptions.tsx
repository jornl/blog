import { Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import "remixicon/fonts/remixicon.css";
import FormInput from "@/Components/Form/FormInput";

type PostOptionsProps = {
  setData: (key: any, value?: any) => void;
  data: any;
};

const PostOptions = ({ setData, data }: PostOptionsProps) => {
  const [show, setShow] = useState(true);

  return (
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
                  checked={data.is_published}
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
            {data.is_published && (
              <>
                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Published At</span>
                  </label>
                  <FormInput
                    type="date"
                    className="w-full"
                    value={data.published_at}
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
                    value={data.unpublished_at}
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
                checked={data.is_featured}
                onChange={(e) => setData("is_featured", e.target.checked)}
              />
            </label>
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

export default PostOptions;
