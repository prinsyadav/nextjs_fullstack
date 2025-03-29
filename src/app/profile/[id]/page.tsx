import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Profile Page</h1>
      <h1 className="flex items-center text-amber-300 border border-white rounded-lg p-2 mt-3">
        {id}
      </h1>
    </div>
  );
}
