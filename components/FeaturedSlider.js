"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import TileCard from "./TileCard";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedSlider({ tiles }) {
  return (
    <div className="w-full pb-12">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {tiles.map((tile) => (
          <SwiperSlide key={tile.id}>
            <div className="pb-8">
              <TileCard tile={tile} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
