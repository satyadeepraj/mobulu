import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";


const Header = ({ session }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center bg-gray-900 text-white border-b border-gray-200 text-sm py-3 px-4 sm:px-6 lg:px-8 w-full h-20 z-50 shadow-xl">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/products" className="text-xl font-bold">
          E-commerce Store
        </Link>
        <div className="space-x-4 flex items-center">
          {/* Open Dialog Button */}
          <button
            onClick={openDialog}
            className="rounded-md  py-2 px-4 text-sm  shadow-md transition-all hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
          >
            <img src="/cart.png" className="w-6 h-6" alt="NoImage" />
          </button>

          {/* Dialog */}
          {isDialogOpen && (
            <div
            
              className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm  overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg">
                <h2
                  id="dialog-title"
                  className="text-2xl font-bold text-white pb-4"
                >
                  Cart Items
                </h2>
                <Cart/>

                <div className="flex justify-end pt-4 space-x-2">
                  <button
                    onClick={closeDialog}
                    className="rounded-md border border-transparent py-2 px-4 text-sm text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeDialog}
                    className="rounded-md bg-green-600 py-2 px-4 text-sm text-white shadow-md transition-all hover:bg-green-700 focus:bg-green-700 active:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          
        </div>
      </nav>
    </header>
  );
};

export default Header;
