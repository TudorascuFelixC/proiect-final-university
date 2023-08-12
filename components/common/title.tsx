import React from "react";

export default function Title(props: any) {
  return (
    <div className={`bg-frame1 flex flex-col justify-items-start pt-24 pb-2`}>
      <div className="container mx-auto">
        <div className="bg-white mb-2 max-w-fit p-2 rounded-md">
          <h1 className="pl-2 text-2xl text-black ">{props.title}</h1>
        </div>
        <div className="bg-white mb-2 max-w-fit rounded-md">
          <h2 className="pl-2 text-xl text-black p-2 ">{props.breadcrumb}</h2>
        </div>
      </div>
    </div>
  );
}
