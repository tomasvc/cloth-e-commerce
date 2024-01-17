import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-col font-['Oswald'] bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0 max-w-7xl w-full mx-auto px-4 md:px-8 pt-9 pb-12">
        <div className="w-fit text-sm font-light flex flex-col gap-2">
          <h4 className="mb-2 text-2xl font-semibold">Help & Information</h4>
          <p className="cursor-pointer w-fit">Help</p>
          <p className="cursor-pointer w-fit">Track Order</p>
          <p className="cursor-pointer w-fit">Delivery & Returns</p>
          <p className="cursor-pointer w-fit">Premier Delivery</p>
          <p className="cursor-pointer w-fit">10% Student Discount</p>
        </div>
        <div className="w-fit text-sm font-light flex flex-col gap-2">
          <h4 className="mb-2 text-2xl font-semibold">About Cloth</h4>
          <p className="cursor-pointer w-fit">About us</p>
          <p className="cursor-pointer w-fit">Careers</p>
          <p className="cursor-pointer w-fit">Corporate responsibility</p>
          <p className="cursor-pointer w-fit">Investors' site</p>
          <p className="cursor-pointer w-fit">Cyber Security</p>
        </div>
        <div className="w-fit text-sm font-light flex flex-col gap-2">
          <h4 className="mb-2 text-2xl font-semibold">More from Cloth</h4>
          <p className="cursor-pointer w-fit">Mobile and Cloth apps</p>
          <p className="cursor-pointer w-fit">Cloth Marketplace</p>
          <p className="cursor-pointer w-fit">Gift vouchers</p>
          <p className="cursor-pointer w-fit">Black Friday</p>
          <p className="cursor-pointer w-fit">
            Our responsible fashion journey
          </p>
        </div>
      </div>
      <div className="font-light bg-gray-800 py-4 text-xs">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between max-w-7xl px-8 w-full mx-auto">
          <p>&copy; {new Date().getFullYear()} Cloth — created by tomasvc</p>
          <div className="flex gap-6">
            <p className="cursor-pointer w-fit">Privacy Policy</p>
            <p className="px-4 border-x cursor-pointer w-fit">T&C</p>
            <p className="cursor-pointer w-fit">Accessibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};
