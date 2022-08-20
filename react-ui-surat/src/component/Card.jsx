import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="max-w-full bg-white shadow-md hover:shadow-xl rounded-lg border cursor-pointer border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/detail/${data.label_slug}`}>
        <img
          className="rounded-md"
          src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/blog.jpg?alt=media&token=271cb624-94d4-468d-a14d-455377ba75c2"
          alt=""
        />
        <img
          className="rounded-t-lg w-14"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
        <div className="p-5">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.title}
          </h6>
          <div
            className="inline-flex font-normal items-center overflow-hidden truncate w-full"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
