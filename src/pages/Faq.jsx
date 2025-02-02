import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Card from "../components/Card/Card";
const Faq = () => {
  const [open, setOpen] = React.useState(0);
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-textBold font-bold text-2xl mb-1">Faqs</h1>
          <p className="font-normal text-textThin">
            Follow Koloni Dashboard Faq's
          </p>
        </div>
      </div>

      <Card className="mt-6">
        <h1 className="font-semibold text-lg mb-4">Discovery</h1>
        <div className="div mb-6">
          <Accordion
            className="p-2 px-4 mb-2 bg-slate-100 rounded-md font-publicSans"
            open={open === 1}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader
              className="font-publicSans py-2 rounded-md text-base font-semibold text-textBold border-none"
              onClick={() => handleOpen(1)}
            >
              Apa itu Fitur Creator Discovery?
            </AccordionHeader>
            <AccordionBody className="font-publicSans font-medium border-t-slate-200 border-t-2">
              Creator Discovery adalah fitur untuk menemukan kreator di mana
              saja — di Instagram, TikTok, dan YouTube.Kami menyediakan subfitur
              By Filter dan By Similar pada Creator Discovery.
            </AccordionBody>
          </Accordion>

          <Accordion
            className="p-2 px-4 mb-2 bg-slate-100 rounded-md font-publicSans "
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className="font-publicSans py-2 rounded-md text-base font-semibold text-textBold border-none"
              onClick={() => handleOpen(2)}
            >
              Apakah credit akan dikurangi berdasarkan filter kriteria yang
              dipilih?
            </AccordionHeader>
            <AccordionBody className="font-publicSans font-medium border-t-slate-200 border-t-2">
              Credit-mu akan berkurang apabila tombol "Search" dan "Next Page"
              diklik.
            </AccordionBody>
          </Accordion>
        </div>
      </Card>

      <Card className="mt-6">
        <h1 className="font-semibold text-lg mb-4">Analyser</h1>

        <div className="div mb-6">
          <Accordion
            className="p-2 px-4 mb-2 bg-slate-100 rounded-md font-publicSans"
            open={open === 3}
            icon={<Icon id={3} open={open} />}
          >
            <AccordionHeader
              className="font-publicSans py-2 rounded-md text-base font-semibold text-textBold border-none"
              onClick={() => handleOpen(3)}
            >
              Apa itu Fitur Analyser?
            </AccordionHeader>
            <AccordionBody className="font-publicSans font-medium border-t-slate-200 border-t-2">
              Fitur ini sangat berguna bagi kamu yang ingin menganalisis
              insights influencer.
            </AccordionBody>
          </Accordion>
          <Accordion
            className="p-2 px-4 mb-2 bg-slate-100 rounded-md font-publicSans "
            open={open === 4}
            icon={<Icon id={4} open={open} />}
          >
            <AccordionHeader
              className="font-publicSans py-2 rounded-md text-base font-semibold text-textBold border-none"
              onClick={() => handleOpen(4)}
            >
              Apabila username telah dicari dengan Analyser, lalu saya
              mencarinya kembali apakah hal tersebut menggunakan 1 credit?
            </AccordionHeader>
            <AccordionBody className="font-publicSans font-medium border-t-slate-200 border-t-2">
              Ya, hal tersebut akan menggunakan 1 credit walaupun pencarian di
              platform media sosial yang sama atau berbeda.
            </AccordionBody>
          </Accordion>
        </div>
      </Card>
    </div>
  );
};

export default Faq;
