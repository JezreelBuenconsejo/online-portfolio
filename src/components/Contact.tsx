import { FaFacebookSquare, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-theme-background text-theme-text">
      <h2 className="text-center text-4xl md:text-6xl font-semibold mb-8 text-main-blue">
        Contact
      </h2>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <p className="text-lg">
          Feel free to reach out to me through any of the platforms below:
        </p>
        <div className="flex flex-col gap-10 justify-center md:items-center ">
          <ul className="md:space-x-5 space-y-5 md:space-y-0 flex flex-wrap flex-col  md:flex-row">
            <li className="flex">
              <a
                href="https://www.facebook.com/jezreel.buenconsejo.10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-main-blue hover:text-main-bluedark space-x-3 transition ease-in-out duration-200"
              >
                <FaFacebookSquare className="text-3xl" />
                <span className="text-xl">Facebook</span>
              </a>
            </li>
            <li className="flex">
              <a
                href="https://github.com/JezreelBuenconsejo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-main-blue hover:text-main-bluedark space-x-3 transition ease-in-out duration-200"
              >
                <FaGithub className="text-3xl" />
                <span className="text-xl">GitHub</span>
              </a>
            </li>
            <li className="flex">
              <a
                href="https://www.instagram.com/randomguuuuuy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-main-blue hover:text-main-bluedark space-x-3 transition ease-in-out duration-200"
              >
                <FaSquareInstagram className="text-3xl" />
                <span className="text-xl">Instagram</span>
              </a>
            </li>
          </ul>
          <ul className="space-y-5">
            <li className="flex">
              <a
                href="mailto:b.jezreel@yahoo.com"
                className="flex items-center justify-center text-main-blue hover:text-main-bluedark space-x-3 transition ease-in-out duration-200"
              >
                <MdEmail className="text-3xl" />
                <span className="text-xl">b.jezreel@yahoo.com</span>
              </a>
            </li>
            <li className="flex">
              <a
                href="tel:+639654464832"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-main-blue hover:text-main-bluedark space-x-3 transition ease-in-out duration-200"
              >
                <FaPhoneAlt className="text-3xl" />
                <span className="text-xl">+63 965 446 4832</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
