import Bg from "../components/Bg";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Bg />
      <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <section className="my-14 text-center space-y-5 ">
          <h1 className=" text-5xl uppercase">
            Kona Village, A Rosewood Resort
          </h1>
          <h2 className="  text-lg font-light text-black/75">
            Along the sacred shores of Kahuwai Bay, Kona Village, A Rosewood
            Resort is an iconic Big Island hideaway rooted in the legacy and
            moʻolelo (stories) of the native Hawaiians who came before. An
            inviting retreat for families, these historic lands hold wonders for
            guests of every generation. Immerse in the profound warmth of local
            hoʻokipa (hospitality of complete giving) in this former ancient
            fishing village, now sustainably renewed and elevated with the
            tastes of the 21st century.
          </h2>
          <Link to="/booking">
            <button className="bg-black text-white px-8 py-3 text-md uppercase my-3">
              <h1>Book now</h1>
            </button>
          </Link>
        </section>
      </div>
      <section className="my-14 space-y-5 ">
        <div className="bg-custom-image h-screen bg-cover bg-center relative">
          <div className="absolute left-20 top-20 w-1/3 h-3/4 bg-white">
            <div className="py-20 px-14 space-y-5">
              <h1 className="text-4xl">
                A NEW ERA, <span className="italic">same</span> STEADY PULSE
              </h1>
              <h2 className="text-lg text-black/75">
                From its discovery by the first Polynesian settlers to the rise
                of Kaʻūpūlehu, to its new life as a world-class resort, the
                history of Kona Village is rich with legend. Upheld by
                Rosewood’s A Sense of Place® philosophy, the resort’s unique
                identity – from its history to its cultural expression and its
                one-of-a-kind natural wonders – will be central to the guest
                experience.
              </h2>
              <button className="bg-black px-10 py-3 text-white uppercase rounded-sm ">
                <h1>our heritage</h1>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="my-14 space-y-5 ">
        <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
          <div className="grid grid-cols-2 gap-10">
            <h1 className="text-5xl font-light ">
              CAREERS <span className="italic">at</span> KONA VILLAGE
            </h1>
            <div className="space-y-10">
              <h2 className="text-lg text-black/75 ">
                Relationship Hospitality. It’s in the genes. Some just have it;
                a natural desire to deliver meaningful and heartfelt
                experiences. It’s a calling. At Rosewood Hotel Group we work
                instinctively and from the heart, to master and elevate our
                craft. Together, we push the boundaries to impart magic into
                every day. We care for people, and make it our purpose to build
                long-lasting, genuine relationships. Here, we do what we were
                born to do. Here, we answer The Calling.
              </h2>
              <Link to="/careers" target="_blank" rel="noopener noreferrer">
                <button className="border border-zinc-600 text-md px-4 py-2 uppercase my-10 hover:text-white hover:bg-black transition-all">
                  <h1>Apply Now</h1>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
