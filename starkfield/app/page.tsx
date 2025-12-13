import HeroPage from "./components/home/hero-page";
import FeaturePage from "./components/features/features";
import PricingPage from "./components/pricing/pricing";
import TestimonialPage from "./components/testimonial/testimonial";
import CtaPage from "./components/cta-section/cta";
import MainNavPage from "./components/farm_chain/navbar/page";
import FarmChain from "./components/farm_chain/farmchain";

// interface MainNavPageProps {
//   setMenu: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function Home() {
  return (
    <div className="">
      <HeroPage/>
      <FeaturePage/>

      {/* <PricingPage/> */}

      <TestimonialPage/>
      <CtaPage/>

      {/* <FarmChain /> */}
       
    </div>
  );
}
