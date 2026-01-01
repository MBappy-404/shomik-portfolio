/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TBlog = {
  _id: string;
  author: string;
  title: string;
  blogImage: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProject = {
  _id: string;
  projectName: string;
  projectImage: string;
  link: string;
  category: string;
  projectDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
