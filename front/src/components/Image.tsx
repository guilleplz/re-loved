"use client"

import React from "react";

import { IKImage } from "imagekitio-react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface ImageProps {
  path: string;
  width: number;
  heigth: number;
  alt: string;
}

const Image = ({ path, width, heigth, alt }: ImageProps) => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path={path}
      width={width}
      height={heigth}
      alt={alt}
    />
  );
};

export default Image;
