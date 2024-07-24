import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import {
  ComponentPropsWithRef,
  ElementType,
  FC,
  LegacyRef,
  MutableRefObject,
  RefAttributes,
  RefCallback,
} from "react";

type PossibleRef<T> = LegacyRef<T> | undefined;

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function mergeRefs<T>(refs: PossibleRef<T>[]): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export interface OverridableComponent<Component, Element extends HTMLElement> {
  (props: Component & RefAttributes<Element>): ReturnType<FC>;

  <As extends ElementType>(
    props: {
      as: As;
    } & Component &
      Omit<ComponentPropsWithRef<As>, keyof Component | "as">,
  ): ReturnType<FC>;
}
