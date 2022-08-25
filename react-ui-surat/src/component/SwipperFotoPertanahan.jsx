import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";

import API from "../utils/host.config";
import SwiperCore, { Lazy, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgress } from "@mui/material";

import { useState } from "react";
import ModalNewImageFotoPertanahan from "./ModalNewImageFotoPertanahan";
import ModalViewFotoPertanahan from "./ModalViewFotoPertanahan";

SwiperCore.use([Lazy, Navigation, Pagination]);

function SwiperFotoPertanahan(props) {
  const { data, swiperCore } = props;

  const [newFoto, setNewFoto] = useState(false);
  const [viewFoto, setViewFoto] = useState(false);

  return (
    <div className="flex flex-col relative bg-white">
      <h1 className="text-base text-left border-b pb-1">Masukkan semua foto di sini :</h1>
      <div className="relative mb-5 text-center h-34 px-3">
        {data && data?.status ? (
          data?.results.listpertanahan.length === 0 ? (
            <div className="h-36 flex items-center justify-center border-b">
              <div
                className="flex flex-col p-4 rounded transition-all cursor-pointer duration-300 hover:border hover:shadow hover:scale-105"
                onClick={() => setNewFoto(true)}
              >
                <i className="fa-solid fa-images"></i>
                <p>Klik untuk menambah Foto Pertanahan</p>
              </div>
            </div>
          ) : (
            <Swiper
              onInit={(swiper) => {
                swiperCore.current = swiper; // instance;
              }}
              // slide
              slidesPerView={4}
              initialSlide={data?.results?.listpertanahan.length - 1}
              centeredSlides={true}
              lazy={{ enabled: true, loadPrevNext: true }}
              spaceBetween={30}
              pagination={{
                type: "fraction",
              }}
              direction="horizontal"
              navigation={true}
              onSlideChange={(swiper) => { }}
              className="border-b"
            >
              {data?.results.listpertanahan.map((slideContent, index) => (
                <SwiperSlide key={slideContent.id} virtualIndex={index}>
                  <div
                    className="my-2 h-36 relative flex items-center overflow-hidden rounded bg-slate-300 transition-all cursor-pointer hover:scale-105 duration-300"
                    onClick={() => setViewFoto(slideContent)}
                  >
                    <img
                      data-src={API.HOST + slideContent.image_url}
                      className="swiper-lazy w-full h-full object-cover"
                      alt="virtual-tour-polinema"
                    />
                    <div className="absolute inset-x-0 bottom-3 px-3 bg-white bg-opacity-40  truncate text-sm">
                      {slideContent.caption}
                    </div>
                  </div>
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlide>
              ))}
              <SwiperSlide
                key={data?.results.listpertanahan.length}
                virtualIndex={data?.results.listpertanahan.length}
              >
                <div
                  className="h-36 flex items-center justify-center  cursor-pointer"
                  onClick={() => setNewFoto(true)}
                >
                  <div className="flex flex-col p-4 rounded transition-all duration-300 hover:border hover:shadow hover:scale-105">
                    <i className="fa-solid fa-images"></i>
                    <p>Klik untuk menambah Foto Pertanahan</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          )
        ) : (
          <div className="h-36 flex items-center justify-center border-b">
            <CircularProgress />
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalNewImageFotoPertanahan
        open={newFoto}
        data={data} //data
        close={() => setNewFoto(false)}
      />
      {viewFoto && (
        <ModalViewFotoPertanahan
          open={viewFoto ? true : false}
          data={viewFoto} //data
          close={() => setViewFoto(false)}
        />
      )}
    </div>
  );
}

export default SwiperFotoPertanahan;
