import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Logingrp from "@/components/pages/Logingrp";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login - Campspotter",
  description: "Login - Campspotter",
};

export default function Logincampgrp() {
  const navigate = useNavigate();

  useEffect(() => {
    const camperLoggedIn = localStorage.getItem('loggedIn');
    const campgrpLoggedIn = localStorage.getItem('campgrpLoggedIn');

    console.log('camperLoggedIn:', camperLoggedIn);
    console.log('campgrpLoggedIn:', campgrpLoggedIn);

    if (campgrpLoggedIn) {
      console.log('Redirecting to campgrp-dashboard');
      navigate('/campgrp-dashboard');
    } else if (camperLoggedIn) {
      console.log('Redirecting to db-profile');
      navigate('/db-profile');
    }
  }, [navigate]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <Header1 />
        <Logingrp />
        <FooterOne />
      </main>
    </>
  );
}
