import React from "react";
import DetailBerita from "../assets/images/img-detail.jpg";
import moment from "moment";
import idLocale from "moment/locale/id";

const CardDetail = ({ data }) => {
  return (
    <div className="w-full laptop:w-[95%] dark:bg-gray-800 mx-auto rounded-lg laptop:ml-[1.9rem]">
      <p className="my-4">
        {moment(data?.updated_date)
          .local("id", idLocale)
          .format("hh.mm - DD MMMM YYYY")}
      </p>
      <img className="rounded-t-lg object-cover" src={DetailBerita} alt="" />
      {/* <div className="p-5"> */}
      <div
        dangerouslySetInnerHTML={{ __html: data?.results?.content }}
        className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify mt-5"
      ></div>
      {/* </div> */}
    </div>
  );
};

export default CardDetail;
