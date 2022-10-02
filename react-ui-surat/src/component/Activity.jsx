import React from "react";
import { Link } from "react-router-dom";

const Activity = ({ data }) => {
  return (
    <div className="w-full p-1 desktop:p-4">
      <Link to={`/detail/${data.label_slug}`}>
        <div className="block object-cover object-center w-full h-full rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <img
            className="w-full object-cover object-center mr-4 "
            src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/blog.jpg?alt=media&token=271cb624-94d4-468d-a14d-455377ba75c2"
            alt="blog cover"
          />
          <div className="p-3">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3 capitalize">
              {data?.title}
            </h1>
            <div className="flex items-center flex-wrap ">
              <div
                className="inline-flex items-center overflow-hidden truncate w-full"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              ></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Activity;
