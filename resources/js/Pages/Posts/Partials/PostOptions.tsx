import { Disclosure, Transition } from "@headlessui/react";
import { useState } from "react";

const PostOptions = () => {
  const [show, setShow] = useState(true);
  return (
    <Disclosure as="div" className="collapse bg-base-200">
      <Disclosure.Button
        className="collapse-title text-xl font-medium"
        onClick={() => setShow(!show)}
      >
        Options
      </Disclosure.Button>
      <Transition
        show={show}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="collapse-content">
          Hello world
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

export default PostOptions;
