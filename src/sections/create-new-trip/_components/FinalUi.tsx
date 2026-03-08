"use client";

import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";

function FinalUi({viewTrip,disable}: any) {
  return (
    <div className="flesx flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl">
        <Globe2 className="text-green-500 text-4xl animate-bounce"/>
        <h2 className="mt-3 text-lg font-semibold text-green-500">
            Planning your dream trip....
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1">
            Gathering best destinations, activities, and accommodations for your unforgettable journey.
        </p>
        <Button disabled={disable} onClick={viewTrip} className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white">
            View Your Trip
        </Button>
    </div>
  )
}

export default FinalUi;