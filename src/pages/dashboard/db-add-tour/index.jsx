import AddTour from "@/components/dasboard/AddTour";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Add Camping - Campspotter",
  description: "Campspotter - Adventure Made Easy!",
};

export default function DBAddTourPage() {
  const handleLogout = () => {
    // Logic to handle logout
    localStorage.removeItem('campgrpLoggedIn');
    localStorage.removeItem('campgrpEmail');
    localStorage.removeItem('campgrpName');
    window.location.href = '/logingrp';
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddTour onLogout={handleLogout} />
      </main>
    </>
  );
}
