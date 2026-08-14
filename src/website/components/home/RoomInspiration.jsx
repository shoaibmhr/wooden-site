import Container from "../common/Container";

import backgroundImage from "../../../assets/image/bg-2-1 - Copy.jpg";
import roomImage from "../../../assets/image/lookbook-1.jpg";

const hotspots = [
  {
    id: 1,
    position: "top-[27%] right-[16%]",
  },
  {
    id: 2,
    position: "bottom-[40%] right-[37%]",
  },
  {
    id: 3,
    position: "left-[14%] bottom-[23%]",
  },
];

export default function RoomInspiration() {
  return (
    <section className="w-full overflow-hidden">
      <Container className="!max-w-none !p-0">
        <div className="grid w-full lg:grid-cols-[5fr_7fr]">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div
            className="
              flex
              min-h-[420px]
              items-center
              justify-center
              bg-cover
              bg-center
              bg-no-repeat
              px-6
              py-12
              <div
 
    h-[300px]
    overflow-hidden

    sm:h-[360px]
    md:h-[400px]
    lg:h-[450px]
    xl:h-[500px]
  

              sm:px-8
              sm:py-14

              md:px-12
              md:py-16

              lg:px-10
              lg:py-12

              xl:px-16
            "
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div
              className="
                w-full
                max-w-xl
                text-center
                text-white

                lg:text-left
              "
            >
              <h2
                className="
                  text-4xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight

                  sm:text-5xl

                  lg:text-[3.25rem]

                  xl:text-[3.75rem]
                "
              >
                Room
                <br />
                Inspiration
              </h2>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-white/90

                  sm:mt-6
                  sm:text-base

                  lg:max-w-md
                "
              >
                Discover fresh ideas from our in-house stylists and other Funiro
                customers to transform your own room.
              </p>

              <button
                type="button"
                className="
                  mt-7
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-none
                  border
                  border-white
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  tracking-wide
                  text-neutral-900

                  transition-all
                  duration-300

                  hover:bg-transparent
                  hover:text-white

                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-transparent

                  sm:px-6
                  sm:text-sm
                "
              >
                SHOP ALL NEW IN
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE / HOTSPOTS
          ================================================== */}
          <div
            className="
    relative
    h-[300px]
    overflow-hidden

    sm:h-[360px]
    md:h-[400px]
    lg:h-[450px]
    xl:h-[500px]
  "
          >
            <img
              src={roomImage}
              alt="Room inspiration furniture"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black/0" />

            {/* =================================================
                HOTSPOTS
            ================================================== */}
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                aria-label={`View room inspiration item ${hotspot.id}`}
                className={`
                  group
                  absolute
                  ${hotspot.position}

                  flex
                  h-6
                  w-6
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-white/90
                  bg-white
                  text-base
                  font-semibold
                  leading-none
                  text-neutral-900

                  shadow-lg

                  transition-all
                  duration-300

                  hover:scale-110
                  hover:bg-amber-800
                  hover:text-white

                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-transparent

                  sm:h-7
                  sm:w-7
                  sm:text-lg
                `}
              >
                <span className="relative z-10 -mt-px">+</span>

                {/* Ripple 1 */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-white
                    opacity-0

                    animate-[roomRipple_2s_ease-out_infinite]
                  "
                />

                {/* Ripple 2 */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-white
                    opacity-0

                    animate-[roomRipple_2s_ease-out_infinite]
                    [animation-delay:1s]
                  "
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
