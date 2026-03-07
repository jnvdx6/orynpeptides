"use client";

import NextLink from "next/link";
import { useLocale } from "@/i18n/LocaleContext";
import type { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: LocaleLinkProps) {
  const { localePath } = useLocale();

  const localizedHref =
    typeof href === "string" && href.startsWith("/")
      ? localePath(href)
      : href;

  return <NextLink href={localizedHref} {...props} />;
}
