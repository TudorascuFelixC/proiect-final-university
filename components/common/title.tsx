import React from "react";

export default function Title(props: any) {
  return (
    <div className={`bg-frame1 flex flex-col items-center justify-center`}>
      <div>
        <h1 className="text-3xl text-black bg-white mb-2">{props.title}</h1>
      </div>
      <div>
        <h2 className="text-xl text-black bg-white mb-2">{props.breadcrumb}</h2>
      </div>
    </div>
  );
}
